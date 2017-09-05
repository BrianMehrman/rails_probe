import React, { Component } from 'react';

import '../css/App.css';

import Sidebar from '../components/Sidebar';
import ReportView from '../components/ReportView';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

export default class ReportShow extends Component {
  render() {
    return (
      <div className='Main'>
        <App className='wrap container-fluid'>
          <Split separator={true} flex='right'>
            <Sidebar />
            <ReportView />
          </Split>
        </App>
      </div>
    )
  }
}
