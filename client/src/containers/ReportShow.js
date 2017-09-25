import React, { Component } from 'react';

import '../css/App.css';

import ReportView from '../components/ReportView';

import App from 'grommet/components/App';

export default class ReportShow extends Component {
  render() {
    return (
      <div className='Main'>
        <App className='wrap container-fluid'>
          <ReportView />
        </App>
      </div>
    )
  }
}
