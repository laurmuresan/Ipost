import forEach from 'lodash/forEach';
import camelCase from 'lodash/camelCase';
import { Reactor } from 'nuclear-js';
import ErrorHandler from './error-handler';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'; // eslint-disable-line
import { Provider, connect as nuclearConnect } from 'nuclear-js-react-addons';

let registeredModulesCount = 0;
let currentModule = null;
let currentModuleName = null;

class Context extends Reactor {
  constructor(options) {
    super(options);

    this.debug = !!options.debug;
    this.modules = {};
    this.getters = {};
    this.actions = {};

    this.Provider = Provider;

    this.connect = (BaseComponent) => {
      const getters = this.getters;
      const containerName = BaseComponent.displayName || BaseComponent.name;
      const getDataBindings = BaseComponent.getDataBindings;

      ErrorHandler.fatal(
        (!getDataBindings || typeof getDataBindings !== 'function'),
        `${containerName} component should implement 'getDataBindings' static method`
      );

      return nuclearConnect((props) => getDataBindings(getters, props))(BaseComponent);
    };
  }

  create(modules) {
    forEach(modules, (module) => {
      currentModule = module;
      currentModuleName = camelCase(
        module.constructor.displayName || module.constructor.name
      );

      ErrorHandler.fatal(
        !currentModule.register,
        'Each module should expose a `register` method.'
      );

      currentModule.register(this);

      this.modules[currentModuleName] = {};
      this.registerGetters();
      this.registerActions();
    }, this);

    registeredModulesCount++;
    currentModuleName = null;
    currentModule = null;
  }

  registerActions() {
    if (currentModule && currentModule.actions) {
      // TODO: automathically dispatch actions
      // const boundActions = {};
      // forEach(currentModule.actions, (action, actionName) => {
      //   boundActions[actionName] = () => this.dispatch(action.type, action.payload);
      // })

      this.modules[currentModuleName].actions = currentModule.actions;
      this.actions[currentModuleName] = currentModule.actions;
    }
  }

  registerGetters() {
    if (currentModule && currentModule.getters) {
      this.modules[currentModuleName].getters = currentModule.getters;
      this.getters[currentModuleName] = currentModule.getters;
    }
  }

  inject(stores) {
    ErrorHandler.fatal(
      !registeredModulesCount,
      `Did you created your application context? Use Context#create() to expose and initialize all of your modules.`
    );

    this.loadState(stores);
  }

  /**
   * Wrap `NuclearJS#dispatch` into `ReactDOM#batchedUpdates`
   * to avoid cascading dispatches
   * @param type - action type
   * @param payload - action payload
   */
  dispatch(type, payload) {
    const dispatch = super.dispatch.bind(this);
    batchedUpdates(() => dispatch(type, payload));
  }
}

export default Context;
