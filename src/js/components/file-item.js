import React, {Component} from 'react';

export default class File extends Component {
  render() {
    return (
      <li className='file-item'>{this.props.name}</li>
    );
  }

}
