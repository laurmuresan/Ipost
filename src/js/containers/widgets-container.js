import React, { Component } from 'react';
import context from '../application-context';
import {
  EntityCreator,
  SearchBar,
  NewFolder,
  Filter,
  ActiveFilters
  // TODO: move assets wiget in widgets
} from '../components/widgets';

class WidgetsContainer extends Component {
  static displayName = 'WidgetsContainer';
  static defaultProps = {
    entityGroup: 'emails'
  };

  static renderingStrategies() {
    return {
      'searchBar': (key, props) =>
        <SearchBar key={ key } { ...props} />,

      'filters': (key, props) =>
        <Filter key={ key } { ...props } />,

      'activeFilters': (key, props) =>
        <ActiveFilters key={ key } { ...props } />,

      'createFolder': (key, props) =>
        <NewFolder key={ key } { ...props } />
    };
  }

  static getDataBindings(getters) {
    const getOperations = getters.entityCache.getOperationsByEntityName;

    return {
      focusInEntityCreatorWidget: getOperations('focusInEntityCreatorWidget'),
      activeWidget: getOperations('activeWidget')
    };
  }

  render() {
    const strategies = WidgetsContainer.renderingStrategies();
    const { entityGroup, activeWidget, focusInEntityCreatorWidget, components } = this.props;
    const widgetProps = components[activeWidget];
    const widgetView = strategies[activeWidget];
    const widget = widgetView ? widgetView(activeWidget, widgetProps) : [];
    const activeFilters = 'activeFilters';

    let activeFiltersWidget = null;

    // render activeFilters if current widget is filters
    // TODO: add activeFitlers inside filters!
    if (activeWidget === 'filters') {
      activeFiltersWidget = strategies[activeFilters](
        activeFilters,
        components[activeFilters]
      );
    }

    return (
      <div>
        <EntityCreator
          entityGroup={entityGroup}
          focusInEntityCreatorWidget={focusInEntityCreatorWidget}
        />
        {widget}
        {activeFiltersWidget}
      </div>
    );
  }
}

const ConnectedWidgetsContainer = context.connect(WidgetsContainer);
export default ConnectedWidgetsContainer;
