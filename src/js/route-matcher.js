import omit from 'lodash/omit';
import indexOf from 'lodash/indexOf';
import forEach from 'lodash/forEach';
import isString from 'lodash/isString';
import ErrorHandler from './error-handler';

function routeMatcher(route = '', params = {}) {
  const paramsRegExp = /([:])(\w+)/g;

  let paramsToExclude = [];

  const excludeParams = (spec) => {
    forEach(paramsToExclude, (name) => {
      if (indexOf(paramsToExclude, name) > -1) {
        spec = omit(spec, name);
      }
    });

    paramsToExclude = [];
    return spec;
  };


  ErrorHandler.fatal(
    !isString(route),
    'routeMatcher: Route must be a string.'
  );


  return {
    route,
    params,

    build() {
      let paramRegExp;
      let path = this.route;

      forEach(this.params, (value, param) => {
        paramRegExp = new RegExp(`:${param}\\b`);

        if (paramRegExp.test(path)) {
          paramsToExclude = [...paramsToExclude, param];
        }

        path = path.replace(paramRegExp, value);
      });

      path = path.replace(paramsRegExp, '');

      return [
        path,
        excludeParams(this.params)
      ];
    }
  };
}

export default routeMatcher;
