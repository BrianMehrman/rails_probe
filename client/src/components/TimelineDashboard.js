import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  BASE_ROUTE,
  selectReport,
  fetchReportsIfNeeded,
  getListenerState,
  toggleListenerIfNeeded,
  deleteAllReportsIfNeeded
} from '../actions';

import ReportsTable from './ReportsTable';
import TimeGraph from './TimeGraph';
import TimeHeader from './TimeHeader';

import Box from 'grommet/components/Box';

class TimelineDashboard extends Component {
  static propTypes = {
    selectedReport: PropTypes.string,
    reports: PropTypes.array,
    isFetching: PropTypes.bool,
    isFetchingReport: PropTypes.bool,
    isListening: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchReportsIfNeeded());
    dispatch(getListenerState());
  }

  selectReport = report => {
    this.props.dispatch(selectReport(report));
  }

  toggleListener = () => {
    this.props.dispatch(toggleListenerIfNeeded());
  }

  deleteAllReports = () => {
    const {dispatch, history} = this.props;
    dispatch(deleteAllReportsIfNeeded());
    history.push(BASE_ROUTE);
  }

  render() {
    const {
      reports,
      selectedReport,
      isListening
     } = this.props;

    return (
      <Box direction='column'
        flex={true}
        pad='none'
        justify='center'
        colorIndex='neutral-2'>
        <TimeHeader
          isListening={isListening}
          toggleListener={this.toggleListener}
          deleteAllReports={this.deleteAllReports} />
        <TimeGraph reports={reports} />
        <ReportsTable
          reports={reports}
          selectReport={this.selectReport}
          selectedReport={selectedReport} />
      </Box>
    )
  }
}

const mapStateToProps = state => {
  const {
      selectedReport,
      reports,
      isFetching,
      isFetchingReport
  } = state.reports;


  const {
    isListening
  } = state.listener;

  return {
    selectedReport,
    reports,
    isFetching,
    isFetchingReport,
    isListening
  }
}

export default withRouter(connect(mapStateToProps)(TimelineDashboard));
