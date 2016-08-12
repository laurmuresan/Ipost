import React, {Component} from 'react';
import context, { actions, getters } from '../application-context';
import FolderContainer from "./foldercontainer.js";
import Input from "./input.js";

class Container extends Component {

  handleChange(event) {
    actions.myModule.filter({value: event.target.value});
  }

  static getDataBindings() {
    return{
      data: getters.myModule.data,
      value: getters.myModule.value
    }
  }

  render() {
    return (
      <div className="wrapper widget">
        <Input handleChange={this.handleChange}/>
        <div>{ this.props.value ? 'Searching for:' + this.props.value : null }</div>
        <FolderContainer data={this.props.data.directories}/>
      </div>
    )
  }
}

export default context.connect(Container);


