import React, { Component, PropTypes } from 'react';
import context from '../application-context';
import { Link } from 'react-router';
import { actions } from '../application-context';

class TreeItem extends Component {
  static displayName = 'tree-item';

  static contextTypes= {
    location: PropTypes.object
  };

  static getDataBindings(getters, props) {
    return {
      layout: getters.layout.layout,
      user: getters.auth.user
    };
  }

  isMatchingBaseRoute() {
    const { node, activeRoute } = this.props;
    const [ , baseRoute] = activeRoute.split('/');

    return node.route.match('/' + baseRoute + '/');
  }

  rootItem(node, id, level, toggle, className) {
    const nextRoute = node.route || this.context.location.pathname;
    let arrow = node.children ? 'icon-arrow' : '';
    arrow += (className.indexOf('open') > -1) ? ' rotate-icon-arrow' : '';

    return (
      <Link
        id={id}
        to={nextRoute}
        data-level={level}
        className={` ${node.icon}`}
        activeClassName='active'
        onClick={this.handleClickFunction.bind(this)}
        //onClick={(event) => this.handleClick(event, nextRoute, toggle)}
      >
        <span className='link-name'>{node.label}</span>
      </Link>
    );
  }
/*<span className={`title ${mode}`}>{node.label}</span> */

  parentItem(node, id, level, toggle, className) {
    let arrow = node.children ? 'icon-arrow' : '';
    arrow += (className.indexOf('open') > -1) ? ' rotate-icon-arrow' : '';
    const nextRoute = node.route || this.context.location.pathname;

    return (
      <Link
        id={id}
        to={nextRoute}
        data-level={level}
        className={`item-parent ${node.icon}`}
        activeClassName='active'
      >
        <span className='link-name'>{node.label}</span>
      </Link>
    );
  }

  childItem(node, id, level) {
    const pathTo = (node.route) || this.context.location.pathname;
    const cdtEnabled = this.props.user.get('cdtEnabled');

    if (!cdtEnabled && pathTo.indexOf('data-tables') > -1) {
      return;
    }

    return (
      <Link
        id={id}
        data-level={level}
        to={pathTo}
        className={`item-leaf ${node.icon}`}
        activeClassName='active'
        onClick={this.handleClickFunction.bind(this)}
      >
        {node.label}
      </Link>
    );
  }

  handleClickFunction(evt){
    actions.layout.toggleRightMenu(true);
    return;
  }

  render() {
    const { node, toggle, level, id, className, children } = this.props;
    const hasBaseRoute = this.isMatchingBaseRoute();
    let itemStructure = '';

    if (node.mainMenu) {
      itemStructure = this.rootItem(node, id, level, toggle, className);
    } else {
      if (node.children) {
        itemStructure = this.parentItem(node, id, level, toggle, className);
      } else {
        itemStructure = this.childItem(node, node.id, level);
      }
    }

    return (
      <li className={hasBaseRoute ? 'expanded' : ''} key={node.id}>
        {itemStructure}
        {children}
      </li>
    );
  }
}

const ConnectedTreeItem = context.connect(TreeItem);
export default ConnectedTreeItem;
