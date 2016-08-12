import React, { Component } from 'react';
import context from '../application-context';
import delay from 'lodash/delay';
import FoldersWrapper from '../components/tables/folders-wrapper';
import ContentWrapper from '../components/tables/content-wrapper';
const { connector, modules } = context;

const dataBindingsSpec = {
  folder: modules.dataTables.getters.folder,
  folders: modules.dataTables.getters.folders,
  moveTo: modules.dataTables.getters.moveTo,
  folderTablesContent: modules.dataTables.getters.folderTablesContent,

  selectedElements: modules.dataTables.getters.selectedElements,
  currentSortMethod: modules.dataTables.getters.currentSortMethod,

  showMoveModal: modules.templates.getters.showMoveModal,
  showDeleteModal: modules.dataTables.getters.showDeleteModal,
  folderName: modules.templates.getters.newFolderName,
  isFolderInRenameState: modules.templates.getters.isFolderInRenameState,
  folderNameValidation: modules.templates.getters.newFolderValidation,
  selectedFoldersForDeletion: modules.templates.getters.selectedFoldersForDeletion,
  singleDeletionSelection: modules.dataTables.getters.singleDeletionSelection,
  selectedFolderIdFromList: modules.templates.getters.selectedFolderIdFromList,
  selectedTemplateIdFromList: modules.templates.getters.selectedTemplateIdFromList
};

@connector((props) => dataBindingsSpec)
class TableContainer extends Component {
  static displayName = 'TableContainer';

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
      modules.dataTables.actions.getFolders();
      modules.dataTables.actions.getFolderContents({id: 0});
      modules.dataTables.actions.selectTreeElement();
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
      templateActions,
      folderTablesContent,
      selectedElements,
      moveTo,
      showMoveModal,
      folderName,
      folderNameValidation,
      isFolderInRenameState,
      showDeleteModal,
      currentSortMethod,
      selectedFoldersForDeletion,
      singleDeletionSelection,
      selectedFolderIdFromList,
      selectedTemplateIdFromList
      } = this.props;


    const tables = folderTablesContent.get('tables');
    const contentFolders = folderTablesContent.get('folders');

    return (
      <div className='grid-folders-container no-padding row data-tables-manager-container'>
        <div className='clearfix'>
          <div className={this.state.hideFolders ? 'hide-tree' : 'col-md-3 tree-container'}>
            <FoldersWrapper
              data={{ folders, folder }}
            />
          </div>

          <div className={this.state.hideFolders ? 'col-md-12' : 'col-md-9'}>
            <div className={this.state.hideFolders ? 'tree-view-divider closed' : 'tree-view-divider'}
                 onClick={this.toggleTreeView.bind(this)}
            >
              <i className='icons-blue ti-angle-double-left'/>
            </div>
            <ContentWrapper
              contentFolders={contentFolders}
              folders={folders}
              moveTo={moveTo}
              tables={tables}
              folderActions={folderActions}
              templateActions={templateActions}
              selectedElements={selectedElements}
              showMoveModal={showMoveModal}
              currentSortMethod={currentSortMethod}
              showDeleteModal={showDeleteModal}
              selectedListFolder={selectedFolderIdFromList}
              selectedListTemplate={selectedTemplateIdFromList}
              selectedFolder={folder}
              folderName={folderName}
              folderNameValidation={folderNameValidation}
              renameState={isFolderInRenameState}
              selectedFoldersForDeletion={selectedFoldersForDeletion}
              singleDeletionSelection={singleDeletionSelection}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TableContainer;
