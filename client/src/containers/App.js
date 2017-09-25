// @flow
import React, { Component } from 'react';

import '../css/App.css';

import TimelineDashboard from '../components/TimelineDashboard';

import App from 'grommet/components/App';

class Main extends Component {
  render() {
    return (
      <div className='Main'>
        <App className='wrap container-fluid'>
          <TimelineDashboard />
        </App>
      </div>
    );
  }
}

export default Main;
