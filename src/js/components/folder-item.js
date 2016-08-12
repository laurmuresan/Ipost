import React, {Component} from 'react';

export default class Folder extends Component {

  constructor() {
    super();
    this.state = {view: true};
  }

  bttn() {
    if(this.state.view) {
      this.setState({view: false});
    } else {
      this.setState({view: true});
    }
  }

  render() {

    if (this.state.view) {
      return (
        <li className="folder-item true" onClick={this.bttn.bind(this)}>{this.props.name}</li>
      )
    } else {
      return (
        <li className="folder-item false hideMe" onClick={this.bttn.bind(this)}>{this.props.name}</li>
      )
    }
  }
}


