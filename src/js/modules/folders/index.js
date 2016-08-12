import BaseModule from '../../base-module';
import folders from './stores/folders';
import foldersBreadcrumbs from './stores/folders-breadcrumbs';
import createNewFolder from './stores/create-new-folder';
import deleteFolder from './stores/delete-folder';
import searchFoldersAndEmails from './stores/search-folders-and-emails';
import * as actions from './actions';
import * as getters from './getters';

class Folders extends BaseModule {
  static displayName = 'Folders';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({
      folders,
      foldersBreadcrumbs,
      createNewFolder,
      deleteFolder,
      searchFoldersAndEmails
    });
  }
}

export default new Folders();
