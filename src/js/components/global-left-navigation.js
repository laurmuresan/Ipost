import React, { Component } from 'react';
import Icon from './icon';
import TreeMenu from './tree-menu';
import context, { actions } from '../application-context';
import { contentCreation, contentManagement } from '../resources/left-menu-data';

class GlobalLeftNav extends Component {
  static displayName = 'GlobalLeftNav';

  static getDataBindings(getters) {
    return {
      layout: getters.layout.layout
    };
  }

  toggle(params) {
    actions.layout.updateTreeState(params);
  }

  toggleSideNavs(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    actions.layout.toggleSideNavs();
  }

  render() {
    const { layout } = this.props;
    const full = layout.getIn(['globalSideNav', 'full']);
    const mode = full ? '' : 'collapsed';

    return (
      <div className={`${mode}`} id='appSidebar'>
        <div className='branding'>
          <div className='logos'>
            <span className='logo'>
              <Icon type='svg' name='logo-ipost' width='100' height='47'/>
            </span>

            <span className='icon' onClick={this.toggleSideNavs.bind(this)}>
              <Icon type='svg' name='logo-icon' width='47' height='47'/>
            </span>
          </div>
          <span
            className='sidebar-toggler'
            onClick={this.toggleSideNavs.bind(this)}
          />
        </div>
        <section className='menuSection'>
          <h2>Content Creation</h2>

          <TreeMenu
            node={contentCreation}
            level={0}
            className='main-navigation-menu'
            open={layout.get('globalSideNav')}
            toggle={this.toggle.bind(this)}
          />

          <h2>Content Management</h2>

          <TreeMenu
            node={contentManagement}
            level={0}
            className='main-navigation-menu'
            open={layout.get('globalSideNav')}
            toggle={this.toggle.bind(this)}
          />
        </section>
      </div>
    );
  }
}

const ConnectedGlobalLeftNav = context.connect(GlobalLeftNav);
export default ConnectedGlobalLeftNav;
