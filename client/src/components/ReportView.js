import React, { Component } from 'react';
import { withRouter,  } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  BASE_ROUTE,
  fetchReport,
  getListenerState,
  getListenerConfig,
  toggleListenerIfNeeded,
  deleteAllReportsIfNeeded,
  postListenerConfigIfNeeded
} from '../actions';

import MainHeader from './MainHeader';

import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Heading from 'grommet/components/Heading';
import Value from 'grommet/components/Value';
import Book from 'grommet/components/icons/base/Book';
import Attraction from 'grommet/components/icons/base/Attraction';
import Monitor from 'grommet/components/icons/base/Monitor';
import Clock from 'grommet/components/icons/base/Clock';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';

const ValueBox = (props) => {
  const {value, label, icon} = props;

  return (
    <Box direction='row'
      colorIndex='light-1'
      margin='small'>
      <Value value={value}
        icon={icon}
        label={label}
        align='start'
        />
    </Box>
  )
}

class DetailsView extends Component {
  static propTypes = {
    report: PropTypes.object
  }

  render() {
    const {
      report
    } = this.props;

    const { hook, session, start } = report || {};

    const reportId = report && report.id;

    return (
      <Box
        direction='column'
        justify='left'
        size={{height: 'full', width: 'xxlarge'}}
        align='start'
        pad='small'
        colorIndex='neutral-1'>
        <Heading>
          Details View
        </Heading>
        <ValueBox value={reportId}
          icon={<Book />}
          label='ID' />
        <ValueBox value={hook || 'None'}
          icon={<Attraction />}
          label='Hook' />
        <ValueBox value={session}
          icon={<Monitor />}
          label='Session' />
        <ValueBox value={start}
          icon={<Clock />}
          label='Created At' />
      </Box>
    )
  }
}

class PrinterView extends Component {
  static propTypes = {
    print: PropTypes.object
  }

  render() {
    const {
      print
    } = this.props;
    const url =`/${print.url}`;
    return (
      <Box
        size={{height: 'full', width: 'xxlarge'}}
        full='horizontal'
        pad='small'
        direction='column'>
        <Box direction='row'
          >
          <Heading>
            {print.name}
          </Heading>
        </Box>
        <Box direction='row'
          >
            <iframe title={print.type} src={url} width='100%' height="400"></iframe>
        </Box>
      </Box>
    )
  }
}

class ReportView extends Component {
  static propTypes = {
    selectedReport: PropTypes.object,
    listenerConfig: PropTypes.object,
    isFetchingReport: PropTypes.bool,
    isListening: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state= {
      redirectRoute: undefined
    };
  }

  componentDidMount() {
    const { dispatch, selectedReport } = this.props;
    dispatch(fetchReport(selectedReport.id));
    dispatch(getListenerState());
    dispatch(getListenerConfig());
  }

  toggleListener = () => {
    this.props.dispatch(toggleListenerIfNeeded());
  }

  deleteAllReports = () => {
    const { dispatch } = this.props;
    dispatch(deleteAllReportsIfNeeded());
    window.location = BASE_ROUTE;
  }

  updateConfig = (config) => {
    this.props.dispatch(postListenerConfigIfNeeded(config));
  }

  render() {
    const { selectedReport, isListening, history, listenerConfig } = this.props;
    const prints = (selectedReport && selectedReport.prints) || [];
    const { redirectRoute } = this.state;

    if (redirectRoute) {
      return (
        <Redirect to={redirectRoute} />
      )
    } else {
      return (
        <Box direction='column'
          pad='none'
          justify='center'
          size='full'
          colorIndex='light-2'>
          <Box direction='row'
            >
            <Box direction='column'
              pad='small'>
              <Button icon={<CaretBack />}
                onClick={() => {history.push(BASE_ROUTE)}}
                />
            </Box>
            <Box direction='column' full='horizontal'>
              <MainHeader
                isListening={isListening}
                toggleListener={this.toggleListener}
                listenerConfig={listenerConfig}
                onListenerConfigChange={this.updateConfig}
                deleteAllReports={this.deleteAllReports} />
            </Box>
          </Box>
          <Box direction='row'
            justify='center' >
            <Tabs >
              <Tab title='Details'>
                <DetailsView report={selectedReport} />
              </Tab>
              { prints.map((print) => (
                <Tab title={print.type} >
                  <PrinterView print={print} />
                </Tab>
              ))}
            </Tabs>
          </Box>
        </Box>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
      isFetchingReport
  } = state.reports;

  let { selectedReport } = state.reports;

  const {
    isListening,
    listenerConfig
  } = state.listener;

  const { match } = ownProps;

  const reportId = match.params.id;

  if (!selectedReport || reportId !== selectedReport.id) {
    selectedReport = { id: reportId } ;
  }

  return {
    selectedReport,
    isFetchingReport,
    isListening,
    listenerConfig
  }
}

export default withRouter(connect(mapStateToProps)(ReportView));
