import React, { Component } from 'react';
import context from '../application-context';
import delay from 'lodash/delay';
import TreeWrapper from '../components/lists/list-tree-wrapper';
import ContentWrapper from '../components/lists/lists-content-wrapper';

const { lists } = context.modules;

class ListsContainer extends Component {
  static displayName = 'ListsContainer';

  static getDataBindings() {
    return {
      folder: lists.getters.folder,
      folders: lists.getters.listsFolders,
      content: lists.getters.content
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      showGridFoldersLeft: true,
      hideFolders: false
    };
  }

  toggleTreeView() {
    this.setState({
      hideFolders: !this.state.hideFolders
    });
  }

  isEmptyList() {
    const { folders } = this.props;
    const path = [0, 'folders'];

    if (folders && folders.size) {
      return !folders.getIn(path).size;
    } else {
      return true;
    }
  }

  fetchInitialData() {
    if (this.isEmptyList()) {
      lists.actions.getFolders();
      lists.actions.getFolderChildren({ id: 0 });
    }
  }

  componentDidMount() {
    delay(this.fetchInitialData.bind(this), 0);
  }

  render() {
    const { folders, folder, content } = this.props;

    return (
      <div className='grid-folders-container'>
        <div className='row'>
          <div className={this.state.hideFolders ? 'hide-tree' : 'col-xs-3 tree-container'}>
            <TreeWrapper data={{ folders, folder }}/>
          </div>

          <div className={this.state.hideFolders ? 'tree-view-wrapper col-xs-12' : 'tree-view-wrapper col-xs-9'}>
            <div
              className={this.state.hideFolders ? 'tree-view-divider closed' : 'tree-view-divider'}
              onClick={this.toggleTreeView.bind(this)}
            >
              <i className='icons-blue ti-angle-double-left'/>
            </div>
            <ContentWrapper content={content}/>
          </div>
        </div>
      </div>
    );
  }
}

export default context.connect(ListsContainer);
