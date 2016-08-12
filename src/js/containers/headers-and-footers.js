import React, { Component } from 'react';
import { connector, modules } from '../application-context';
import ContentListWrapper from './../components/headers-and-footers/content-list-wrapper';
import HeaderActionsWrapper from '../components/headers-and-footers/header-action-wrapper';
import FolderTreeWrapper from '../components/headers-and-footers/folder-tree-wrapper';
import I18n from '../components/i18n';
import delay from 'lodash/delay';

const dataBindingsSpec = {
  headersAndFootersList: modules.headersAndFooters.getters.headersAndFootersList,
  selectedElements: modules.headersAndFooters.getters.selectedElements,
  selectedFolders: modules.headersAndFooters.getters.selectedFolders,
  selectedItems: modules.headersAndFooters.getters.selectedItems,
  selectedFolderIdFromList: modules.headersAndFooters.getters.selectedFolderIdFromList,
  selectedItemIdFromList: modules.headersAndFooters.getters.selectedItemIdFromList,
  renamingActive: modules.headersAndFooters.getters.renamingActive,
  newFolderValidation: modules.headersAndFooters.getters.newFolderValidation,
  currentSortMethod: modules.headersAndFooters.getters.currentSortMethod,
  layout: modules.layout.getters.layout,
  folder: modules.headersAndFooters.getters.folder,
  searchQuery: modules.filtersManager.getters.searchQuery,
  moveTo: modules.headersAndFooters.getters.moveTo,
  properties: modules.properties.getters.properties,
  templateManagerErrors: modules.notifications.getters.templateManagerErrors,
  folders: modules.headersAndFooters.getters.folders,
  newFolderName: modules.headersAndFooters.getters.newFolderName,
};

@connector((props) => dataBindingsSpec)
class HeadersAndFootersContainer extends Component {
  static displayName = 'HeadersAndFootersContainer';

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
    return !this.props.headersAndFootersList.size;
  }

  fetchData() {
    //if (this.isEmptyList()) {
    modules.headersAndFooters.actions.getHeadersAndFooters({id: 0});
    modules.headersAndFooters.actions.getHeadersAndFootersFolderTree();
    //}
  }

  componentWillMount() {
    delay(this.fetchData, 0);
  }

  render() {
    if (this.isEmptyList()) {
      return (
        <div className='csspinner load1 loading-height'>
          <I18n>Please wait...</I18n>
        </div>
      );
    }

    const {
      types,
      itemsActions,
      folderActions,
      headersAndFootersList,
      selectedElements,
      renamingActive,
      currentSortMethod,
      layout,
      folder,
      moveTo,
      newFolderName,
      templateManagerErrors,
      searchQuery,
      folders,
      selectedFolders,
      selectedItems,
      newFolderValidation,
      selectedItemIdFromList,
      selectedFolderIdFromList
      } = this.props;

    return (
      <div className='header-actions-wrapper-parent '>
        <HeaderActionsWrapper
        types={types}
        layout={layout}
        selectedFolder={folder}
        newFolderName={newFolderName}
        folderNameValidation={newFolderValidation}
        notifications={templateManagerErrors}
        moveTo={moveTo}
        windowIsOpen={layout.get('windowIsOpen')}
        searchQuery={searchQuery}
        currentSortMethod={currentSortMethod}
      />
      <div className='grid-folders-container '>
        <div className='row'>
          <div className={this.state.hideFolders ? 'hide-tree' : 'col-xs-3 tree-container'}>
            <FolderTreeWrapper
              folders={folders}
              selectedFolder={folder}
            />
          </div>

          <div className={this.state.hideFolders ? 'tree-view-wrapper col-xs-12' : 'tree-view-wrapper col-xs-9'}>

            <div className={this.state.hideFolders ? 'tree-view-divider closed' : 'tree-view-divider'}
                 onClick={this.toggleTreeView.bind(this)}
            >
              <i className='icons-blue ti-angle-double-left'/>
            </div>

            <ContentListWrapper
              itemActions={itemsActions}
              folderActions={folderActions}
              headersAndFootersList={headersAndFootersList}
              selectedTreeFolder={folder}
              selectedElements={selectedElements}
              selectedFolders={selectedFolders}
              selectedItems={selectedItems}
              selectedListFolder={selectedFolderIdFromList}
              selectedListItem={selectedItemIdFromList}
              renamingActive={renamingActive}
              currentSortMethod={currentSortMethod}
              folderNameValidation={newFolderValidation}
              newFolderName={newFolderName}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default HeadersAndFootersContainer;
