import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {
  BASE_ROUTE,
  selectReport,
  fetchReportsIfNeeded,
  getListenerState,
  getListenerConfig,
  toggleListenerIfNeeded,
  deleteAllReportsIfNeeded,
  postListenerConfigIfNeeded
} from '../actions';

import ReportsTable from './ReportsTable';
import TimeGraph from './TimeGraph';
import MainHeader from './MainHeader';

import Box from 'grommet/components/Box';

class TimelineDashboard extends Component {
  static propTypes = {
    selectedReport: PropTypes.string,
    reports: PropTypes.array,
    isFetching: PropTypes.bool,
    isFetchingReport: PropTypes.bool,
    isListening: PropTypes.bool,
    listenerConfig: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state= {
      redirectRoute: undefined
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchReportsIfNeeded());
    dispatch(getListenerState());
    dispatch(getListenerConfig());
  }

  updateListenerConfig = (config) => {
    this.props.dispatch(postListenerConfigIfNeeded(config));
  }

  selectReport = report => {
    this.props.dispatch(selectReport(report));
  }

  toggleListener = () => {
    this.props.dispatch(toggleListenerIfNeeded());
  }

  deleteAllReports = () => {
    const { dispatch } = this.props;
    dispatch(deleteAllReportsIfNeeded());
     window.location = BASE_ROUTE;
  }

  render() {
    const {
      reports,
      selectedReport,
      isListening,
      listenerConfig
    } = this.props;

    const { redirectRoute } = this.state;

    if (redirectRoute) {
      debugger
      return (
        <Redirect to={redirectRoute} />
      )
    } else {
      return (
        <Box direction='column'
          flex={true}
          pad='none'
          justify='center'
          colorIndex='neutral-2'>
          <MainHeader
            isListening={isListening}
            listenerConfig={listenerConfig}
            onListenerConfigChange={this.updateListenerConfig}
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
}

const mapStateToProps = state => {
  const {
      selectedReport,
      reports,
      isFetching,
      isFetchingReport
  } = state.reports;

  const {
    isListening,
    listenerConfig
  } = state.listener;

  return {
    selectedReport,
    reports,
    isFetching,
    isFetchingReport,
    isListening,
    listenerConfig
  }
}

export default withRouter(connect(mapStateToProps)(TimelineDashboard));
