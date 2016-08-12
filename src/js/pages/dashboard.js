import React, { Component } from 'react';
import Container from "../components/container.js";
import GlobalLeftNav from '../components/global-left-navigation';

class Dashboard extends Component {
  static displayName = 'Dashboard';


  render() {
    return (
      <div id='app'>
        <GlobalLeftNav/>
        <section id='contentSection'>
        <Container />
        </section>
      </div>
    );
  }
}

export default Dashboard;
