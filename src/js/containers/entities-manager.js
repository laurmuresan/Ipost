import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import SplitLayout from '../components/split-layout';
import EntityTreeContainer from './entity-tree-container';
import EntityContentContainer from './entity-content-container';
import * as ToolbarActions from '../utils/toolbar-actions-definitions';
import { EntityPreviewLayer, backend, dragDropContext } from '../components/drag-and-drop';

class EntitiesManager extends Component {
  static displayName = 'EntitiesManager';

  static defaultProps = {
    customRenderer: null,
    hasLeft: true,
    entityGroup: 'unknown',
    entityType: null,
    actions: {},

    // Handle initial data fetching (it could be the tree or just the content)
    handleInitialFetch: null,
    setupEntityGroup: null,
    setupEntityType: null,
    onUnmount: null,

    // Tree actions
    handleTreeItemClick: null,
    handleTreeItemExpand: null,
    handleTreeExpandAll: null,

    // Content actions
    handleEntitySelect: null,
    handleEntitySelectAll: null,

    // Entities header actions - there are 2 categories
    //  - crud actions
    //  - filter actions
    // These also determine what appears on the header actions (but not the order)
    handleCreateFolder: null,
    handleMoveEntity: null,
    handleDeleteEntity: null,

    // Entities dropdown actions factory
    entitiesDropdownActionsFactory: null,
    toolbarActionsDefinitions: 'defaultActions'
  };

  getToolbarActions() {
    const { toolbarActionsDefinitions } = this.props;

    if (toolbarActionsDefinitions && typeof toolbarActionsDefinitions === 'object') {
      return toolbarActionsDefinitions;
    }

    return ToolbarActions[toolbarActionsDefinitions];
  }

  handleTreeItemClick(event, entity) {
    const { handleTreeItemClick } = this.props;
    const folderId = entity.get('id');
    const folderLabel = entity.get('name');

    if (event && event.preventDefault && event.stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (handleTreeItemClick) {
      handleTreeItemClick({ folderId, folderLabel, noFolders: 1 });
    }
  }

  handleExpanderClick(event, entity) {
    const { handleTreeItemExpand } = this.props;
    const itemId = entity.get('id');

    if (event && event.preventDefault && event.stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (handleTreeItemExpand) {
      handleTreeItemExpand(itemId);
    }
  }

  handleTreeExpandAll(event) {
    const { handleTreeExpandAll } = this.props;

    if (event && event.preventDefault && event.stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (handleTreeExpandAll) {
      handleTreeExpandAll();
    }
  }

  /**
   *  Handle initial data fetching on `componentDidMount` using handleInitialFetch
   *  handler which is sent through props
   */
  handleInitialFetch() {
    const { handleInitialFetch } = this.props;

    if (handleInitialFetch && typeof handleInitialFetch === 'function') {
      handleInitialFetch();
    }
  }

  setupEntityGroup(callback) {
    const { entityGroup, entityType, setupEntityGroup, setupEntityType } = this.props;

    if (!entityGroup) {
      throw new Error('`entityGroup` is required when instiantiating EntitiesManager');
    }

    if (typeof setupEntityGroup !== 'function') {
      throw new Error('`setupEntityGroup` action is required when instantiating EntitiesManager');
    }

    if (typeof setupEntityType === 'function' && entityType) {
      setupEntityType(entityType);
    }

    setupEntityGroup(entityGroup);

    if (callback) {
      callback();
    }
  }

  componentWillMount() {
    const { actions } = this.props;

    if (!isEmpty(actions) && isObject(actions)) {
      console.warn('EntitiesManager#actions property is deprecated.');
    }
  }

  componentDidMount() {
    this.setupEntityGroup(this.handleInitialFetch.bind(this));
  }

  componentWillUnmount() {
    const { onUnmount, entityGroup, setupEntityType } = this.props;

    if (typeof setupEntityType === 'function') {
      setupEntityType(null);
    }

    if (typeof onUnmount === 'function') {
      onUnmount(entityGroup);
    }
  }

  render() {
    let left = null;
    const {
      customRenderer,
      user,
      actions,
      entityGroup,
      hasLeft,
      toolbarActionsDefinitions, // eslint-disable-line
      ...rest
    } = this.props;

    if (hasLeft) {
      left = (
        <EntityTreeContainer
          entityGroup={entityGroup}
          onExpandAllTreeItems={this.handleTreeExpandAll.bind(this)}
          onTreeItemClick={this.handleTreeItemClick.bind(this)}
          onExpanderClick={this.handleExpanderClick.bind(this)}
          actions={actions}
          {...rest}
        />
      );
    }

    const center = (
      <EntityContentContainer
        customRenderer={customRenderer}
        user={user}
        entityGroup={entityGroup}
        actions={actions}
        toolbarActionsDefinitions={this.getToolbarActions()}
        {...rest}
      />
    );

    return (
      <div className='content-section'>
        <SplitLayout
          left={left}
          center={center}
        />
        <EntityPreviewLayer/>
      </div>
    );
  }
}

const WrappedWithDragAndDropContext = dragDropContext(backend)(EntitiesManager);
export default WrappedWithDragAndDropContext;
