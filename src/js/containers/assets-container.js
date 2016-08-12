import React from 'react';
import { Component } from 'react';
import delay from 'lodash/delay';
import AssetsHeaderWrapper from '../components/assets/assets-header-wrapper';
import context, { getters } from '../application-context';
//import UploadAssetItem from '../components/assets/upload-asset-item';
import UploadModalAssets from '../components/assets/upload-modal-assets';

class AssetsContainer extends Component {
  static displayName = 'AssetsContainer';

  static getDataBindings() {
    return {
      layout: getters.layout.layout,
      folder: getters.folders.folder,
      newFolderName: getters.folders.newFolderName,
      newFolderValidation: getters.folders.newFolderValidation,
      notifications: getters.notifications.emailManagerErrors,
      moveTo: getters.folders.moveTo,
      searchQuery: getters.folders.searchQuery,
      currentSortMethod: getters.folders.currentSortMethod,
      files: getters.assets.files,
      validations: getters.assets.validations,
      assets: getters.assets.assets
    };
  }

  constructor(props) {
    super(props);
  }

  fetchInitialData() {
    //implementation
  }

  componentWillMount() {
    delay(this.fetchInitialData.bind(this), 0);
  }


  render() {
    const {
      layout,
      folder,
      newFolderName,
      newFolderValidation,
      notifications,
      moveTo,
      searchQuery,
      currentSortMethod,
      files,
      validations,
      assets
      } = this.props;

    return (
      <div className='content-section'>
          <AssetsHeaderWrapper
            layout={layout}
            selectedFolder={folder}
            newFolderName={newFolderName}
            folderNameValidation={newFolderValidation}
            notifications={notifications}
            moveTo={moveTo}
            windowIsOpen={layout.get('windowIsOpen')}
            searchQuery={searchQuery}
            currentSortMethod={currentSortMethod}
          />
          <UploadModalAssets
            files={files}
            validations={validations}
            assets={assets}
          />
      </div>
    );
  }
}

export default context.connect(AssetsContainer);
