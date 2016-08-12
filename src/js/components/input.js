import React, {Component} from 'react';

export default class Input extends Component{
  static getDataBinding(getters){
    return {
      value: getters.myModule.value
    }
    }
  render() {
    return (
      <input onKeyUp={this.props.handleChange} placeholder='filter...' />
    );
  }
}
