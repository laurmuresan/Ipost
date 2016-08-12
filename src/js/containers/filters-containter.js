import React, { Component } from 'react';
import context from '../application-context';
import delay from 'lodash/delay';
import FilterFolderWrapper from '../components/filters/filter-folders-wrapper';
import FilterContentWrapper from '../components/filters/filter-content-wrapper';
import FilterHeaderWrapper from '../components/filters/filter-header-wrapper';
const { connector, modules } = context;

const dataBindingsSpec = {
  folders: modules.filtersManager.getters.folders,
  folder: modules.filtersManager.getters.folder,
  currentSortMethod: modules.filtersManager.getters.currentSortMethod,
  moveTo: modules.filtersManager.getters.moveTo,
  filterFolderContent: modules.filtersManager.getters.filterFolderContent,
  selectedElements: modules.filtersManager.getters.selectedElements,
  showMoveModal: modules.filtersManager.getters.showMoveModal,
  showDeleteModal: modules.filtersManager.getters.showDeleteModal,
  newFolderName: modules.filtersManager.getters.newFolderName,
  isFolderInRenameState: modules.filtersManager.getters.isFolderInRenameState,
  folderNameValidation: modules.filtersManager.getters.newFolderValidation,
  //selectedFoldersForDeletion: modules.filtersManager.getters.selectedFoldersForDeletion,
  //singleDeletionSelection: modules.filtersManager.getters.singleDeletionSelection,
  selectedFolderIdFromList: modules.filtersManager.getters.selectedFolderIdFromList,
  selectedItemIdFromList: modules.filtersManager.getters.selectedItemIdFromList,
  filtersItemsStore: modules.filtersManager.getters.filtersItemsStore,
  properties: modules.properties.getters.properties,
  layout: modules.layout.getters.layout,
  searchQuery: modules.filtersManager.getters.searchQuery,
  templateManagerErrors: modules.notifications.getters.templateManagerErrors,
};

@connector((props) => dataBindingsSpec)
class FiltersContainer extends Component {
  static displayName = 'FiltersContainer';

  constructor(props) {
    super(props);
    this.state = {
      showGridFoldersLeft: true,
      hideFolders: false
    };
  }

  toggleTreeView() {
    this.setState({'hideFolders': !this.state.hideFolders});
  }

  isEmptyList() {
    if (this.props.folders) {
      return !this.props.folders.getIn([0, 'folders']).size;
    } else {
      return true;
    }
  }

  fetchInitialData() {
    if (this.isEmptyList()) {
      modules.filtersManager.actions.getFolders();
      modules.filtersManager.actions.getFolderContents({id: 0, sortBy: 'created_date', sortOrder: 'asc'});
    }
  }

  componentWillMount() {
    delay(this.fetchInitialData.bind(this), 0);
  }

  render() {
    const {
      folders,
      folder,
      folderActions,
      filterActions,
      filterFolderContent,
      currentSortMethod,
      selectedFolderIdFromList,
      selectedItemIdFromList,
      newFolderName,
      folderNameValidation,
      isFolderInRenameState,
      properties,
      filtersItemsStore,
      moveTo,
      layout,
      templateManagerErrors,
      searchQuery,
      showDeleteModal,
      showMoveModal
      } = this.props;

    const contentFolders = filterFolderContent.get('folders');
    const items = filterFolderContent.get('items');


    return (
      <div>
        <FilterHeaderWrapper
        layout={layout}
        selectedFolder={folder}
        newFolderName={newFolderName}
        folderNameValidation={folderNameValidation}
        notifications={templateManagerErrors}
        moveTo={moveTo}
        windowIsOpen={layout.get('windowIsOpen')}
        searchQuery={searchQuery}
        currentSortMethod={currentSortMethod}
      />
      <div className='grid-folders-container'>
        <div className='row'>
          <div className={this.state.hideFolders ? 'hide-tree' : 'col-xs-3 tree-container'}>
            <FilterFolderWrapper
              data={{folders, folder}}
            />
          </div>

          <div className={this.state.hideFolders ? 'tree-view-wrapper col-xs-12' : 'tree-view-wrapper col-xs-9'}>
            <div className={this.state.hideFolders ? 'tree-view-divider closed' : 'tree-view-divider'}
                 onClick={this.toggleTreeView.bind(this)}
            >
              <i className='icons-blue ti-angle-double-left'/>
            </div>
            <FilterContentWrapper
              //data={{
              //  contentFolders,
              //  folders,
              //  moveTo,
              //  templates
              //}}
              //// const { rename } = this.props.handlers
              //// const { folders } = this.props.data
              //handlers={{
              //  rename
              //}}
              contentFolders={contentFolders}
              items={items}
              currentSortMethod={currentSortMethod}
              folders={folders}
              moveTo={moveTo}
              folderActions={folderActions}
              filterActions={filterActions}
              selectedElements={filtersItemsStore}
              showMoveModal={showMoveModal}
              showDeleteModal={showDeleteModal}
              selectedListFolder={selectedFolderIdFromList}
              selectedListItem={selectedItemIdFromList}
              selectedFolder={folder}
              folderName={newFolderName}
              folderNameValidation={folderNameValidation}
              renameState={isFolderInRenameState}
              //selectedFoldersForDeletion={selectedFoldersForDeletion}
              //singleDeletionSelection={singleDeletionSelection}
              properties={properties}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default FiltersContainer;
