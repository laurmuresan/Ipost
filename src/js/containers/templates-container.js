import React, { Component } from 'react';
import context from '../application-context';
import delay from 'lodash/delay';
import FoldersWrapper from '../components/templates/folders-wrapper';
import ContentWrapper from '../components/templates/content-wrapper';
const { connector, modules } = context;

const dataBindingsSpec = {
  folder: modules.templates.getters.folder,
  folders: modules.templates.getters.folders,
  currentSortMethod: modules.templates.getters.currentSortMethod,
  moveTo: modules.templates.getters.moveTo,
  folderTemplatesContent: modules.templates.getters.folderTemplatesContent,
  selectedElements: modules.templates.getters.selectedElements,
  showMoveModal: modules.templates.getters.showMoveModal,
  showDeleteModal: modules.templates.getters.showDeleteModal,
  newFolderName: modules.templates.getters.newFolderName,
  isFolderInRenameState: modules.templates.getters.isFolderInRenameState,
  folderNameValidation: modules.templates.getters.newFolderValidation,
  selectedFoldersForDeletion: modules.templates.getters.selectedFoldersForDeletion,
  singleDeletionSelection: modules.templates.getters.singleDeletionSelection,
  selectedFolderIdFromList: modules.templates.getters.selectedFolderIdFromList,
  selectedTemplateIdFromList: modules.templates.getters.selectedTemplateIdFromList,
  selectedElementsStore: modules.templates.getters.selectedElementsStore,
  properties: modules.properties.getters.properties,
};

@connector((props) => dataBindingsSpec)
class TemplatesContainer extends Component {
  static displayName = 'TemplatesContainer';

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
      modules.templates.actions.getFolders();
      modules.templates.actions.getFolderContents({id: 0, sortBy: 'created_date', sortOrder: 'asc'});
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
      folderTemplatesContent,
      moveTo,
      showMoveModal,
      newFolderName,
      folderNameValidation,
      isFolderInRenameState,
      showDeleteModal,
      selectedFoldersForDeletion,
      singleDeletionSelection,
      selectedFolderIdFromList,
      selectedTemplateIdFromList,
      currentSortMethod,
      selectedElementsStore,
      properties
      } = this.props;

    const templates = folderTemplatesContent.get('items');
    const contentFolders = folderTemplatesContent.get('folders');

    return (
      <div className='grid-folders-container '>
        <div className='row'>
          <div className={this.state.hideFolders ? 'hide-tree' : 'col-xs-3 tree-container'}>
            <FoldersWrapper
              data={{ folders, folder }}
            />
          </div>

          <div className={this.state.hideFolders ? 'tree-view-wrapper col-xs-12' : 'tree-view-wrapper col-xs-9'}>
            <div className={this.state.hideFolders ? 'tree-view-divider closed' : 'tree-view-divider'}
                 onClick={this.toggleTreeView.bind(this)}
            >
              <i className='icons-blue ti-angle-double-left'/>
            </div>
            <ContentWrapper
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
              templates={templates}
              currentSortMethod={currentSortMethod}
              folders={folders}
              moveTo={moveTo}
              folderActions={folderActions}
              templateActions={templateActions}
              selectedElements={selectedElementsStore}
              showMoveModal={showMoveModal}
              showDeleteModal={showDeleteModal}
              selectedListFolder={selectedFolderIdFromList}
              selectedListTemplate={selectedTemplateIdFromList}
              selectedFolder={folder}
              folderName={newFolderName}
              folderNameValidation={folderNameValidation}
              renameState={isFolderInRenameState}
              selectedFoldersForDeletion={selectedFoldersForDeletion}
              singleDeletionSelection={singleDeletionSelection}
              properties={properties}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TemplatesContainer;
