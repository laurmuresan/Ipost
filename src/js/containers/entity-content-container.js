import React, { Component } from 'react';
import context from '../application-context';
import { EntityContent, EntityHeader, EntityFooter } from '../components/generic-manager';
import { ActivityIndicator } from '../components/activity-indicator';

class EntityContentContainer extends Component {
  static displayName = 'EntityContentContainer';

  static defaultProps = {
    folderContent: [],
    actions: {}
  };

  static getDataBindings(getters, props) {
    const { entityGroup } = props;
    const getEntityByType = getters.entityCache.getEntity;

    return {
      folderContent: getEntityByType(entityGroup, 'content'),
      operations: getters.entityCache.getOperationsByEntityName(entityGroup),
      entityMeta: getEntityByType(entityGroup, 'meta'),
      isRenamingEntity: getters.entityCache.getOperationsByEntityName('isRenamingEntity'),
      filtersStore: getters.filters.filters
    };
  }

  render() {
    const {
      customRenderer,
      user,
      folderContent,
      entityGroup,
      entityMeta,
      actions,
      operations,
      toolbarActionsDefinitions,
      entitiesDropdownActionsFactory,
      isRenamingEntity,
      disableLabelClick,
      showEntityPreview,
      filtersStore
    } = this.props;

    let renamingEntity;

    if (isRenamingEntity && isRenamingEntity.get) {
      renamingEntity = isRenamingEntity.get('entityId');
    }

    const breadcrumb = entityMeta && entityMeta.get('breadcrumb');
    const isFetchingData = operations && operations.get('isFetchingData');
    const selectedFolder = operations && operations.get('selectedFolder');
    const selectedEntities = operations && operations.get('selectedEntities');
    const resultsNumber = entityMeta && entityMeta.get('totalCount');
    const filter = entityMeta && entityMeta.get('filter');
    const selectedEntitySearchFilter =
      filter && typeof filter.get('parentId') === 'undefined' ?
      operations && operations.get('selectedIdSearchFilter') : '';

    const itemBreadcrumb = selectedEntitySearchFilter ?
                              operations && operations.get('breadcrumbPath') : [];

    return (
      <div className='imm-content-wrapper'>
        <EntityHeader
          customRenderer={customRenderer}
          user={user}
          entityGroup={entityGroup}
          filtersStore={filtersStore}
          content={folderContent}
          breadcrumb={breadcrumb}
          itemBreadcrumb={itemBreadcrumb}
          resultsNumber={resultsNumber}
          filter={filter}
          operations={operations}
          actions={actions}
          toolbarActionsDefinitions={toolbarActionsDefinitions}
        />
        <EntityContent
          customRenderer={customRenderer}
          user={user}
          disableLabelClick={disableLabelClick}
          entityGroup={entityGroup}
          content={folderContent}
          selectedEntities={selectedEntities}
          selectedEntitySearchFilter={selectedEntitySearchFilter}
          actions={actions}
          isFetchingData={isFetchingData}
          showEntityPreview={showEntityPreview}
          isRenamingEntity={renamingEntity}
          entitiesDropdownActionsFactory={entitiesDropdownActionsFactory}
        />
        <EntityFooter
          entityGroup={entityGroup}
          actions={actions}
          selectedFolder={selectedFolder}
          selectedFolderBreadcrumbs={itemBreadcrumb}
          pagination={entityMeta}
        />
        <ActivityIndicator size='medium' visible={isFetchingData}/>
      </div>
    );
  }
}

const ConnectedEntityContentContainer = context.connect(EntityContentContainer);
export default ConnectedEntityContentContainer;
