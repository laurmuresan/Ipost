import React, {Component} from 'react';
import Folder from './folder-item.js';
import File from './file-item.js';
let index = 0;
export default class FolderContainer extends Component {
  render() {
    let output = [];

    this.props.data.forEach((item)=> {
      if (item.type === 'dir') {
        output.push(<Folder name={item.name} key={++index}/>);
      }

      else if (item.type === 'file') {
        output.push(<File name={item.name} key={++index}/>);
            }

      if (item.children) {
        output.push(<FolderContainer data={item.children} key={++index}/>);
      }

    });
    return (
      <ul className='folder-container'> {output}</ul>
    );
  }
}
