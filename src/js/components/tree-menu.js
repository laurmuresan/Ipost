import React, { Component, PropTypes } from 'react';
import TreeItem from './tree-item';

class TreeMenu extends Component {
  static displayName = 'TreeMenu';

  static contextTypes= {
    location: PropTypes.object
  };

  handleClick(event) {
    const node = event.currentTarget;
    const id = node.id;
    const level = parseInt(node.dataset.level);

    event.preventDefault();
    event.stopPropagation();

    if (this.currentOpenItems && this.currentOpenItems.indexOf(id) > -1) {
      this.props.toggle({});
      this.currentOpenItems = null;

      return;
    }

    this.props.toggle({id, level});
  }

  componentWillMount() {
    const { location } = this.context;

    this.activeRoute = location && location.pathname;
  }

  render() {
    const { node, level, className, open, toggle } = this.props;
    const output = [];

    let isParentPanelOpen = false;
    let isChildPanelOpen = false;

    node.forEach((item) => {
      const { children, id } = item;

      const openAndIndex = open && (open.get('listOpenTreeNodes').indexOf(id) > -1);
      if (item.mainMenu && openAndIndex) {
        this.currentOpenItems = open.get('listOpenTreeNodes');
        isParentPanelOpen = true;
      } else {
        isParentPanelOpen = false;
      }
      isChildPanelOpen = !!openAndIndex;

      if (children) {
        output.push(
          <TreeItem
            key={id}
            id={id}
            node={item}
            level={level}
            toggle={this.handleClick.bind(this)}
            className={`${isChildPanelOpen ? 'open' : ''}`}
            activeRoute={this.props.activeRoute || this.activeRoute}
          >
            <TreeMenu
              key={`sub-menu-${id}`}
              node={children}
              level={level + 1}
              open={open}
              className={`sub-menu ${isChildPanelOpen ? 'open' : ''}`}
              toggle={toggle}
              activeRoute={this.activeRoute}
            />
          </TreeItem>
        );
      } else {
        output.push(
          <TreeItem
            key={id}
            node={item}
            toggle={() => {}}
            className={`${isChildPanelOpen ? 'open' : ''}`}
            activeRoute={this.props.activeRoute || this.activeRoute}
          />
        );
      }
    });

    return (
      <ul className={`${className} ${isParentPanelOpen ? 'open' : ''}`}>
        {output}
      </ul>
    );
  }
}
/*{`${className} ${isParentPanelOpen ? 'open' : ''}`} */
export default TreeMenu;
