import React, { Component } from 'react';
import outsideClick from 'react-onclickoutside';

class EntityTreeWrapper extends Component {
  static displayName = 'EntityTreeWrapper';

  handleClickOutside(event) {
    if (!event.target.classList.contains('imm-tree-view-label')) {
      this.props.setDropDownId(null);
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default outsideClick(EntityTreeWrapper);
