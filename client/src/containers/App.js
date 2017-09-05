// @flow
import React, { Component } from 'react';

import '../css/App.css';

import Sidebar from '../components/Sidebar';
import TimelineDashboard from '../components/TimelineDashboard';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

class Main extends Component {
  render() {
    return (
      <div className='Main'>
        <App className='wrap container-fluid'>
          <Split separator={true} flex='right'>
            <Sidebar />
            <TimelineDashboard />
          </Split>
        </App>
      </div>
    );
  }
}

export default Main;
