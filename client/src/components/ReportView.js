import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  BASE_ROUTE,
  fetchReport,
  getListenerState,
  toggleListenerIfNeeded,
  deleteAllReportsIfNeeded
} from '../actions';

import TimeHeader from './TimeHeader';

import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Heading from 'grommet/components/Heading';
import Value from 'grommet/components/Value';
import Book from 'grommet/components/icons/base/Book';
import Attraction from 'grommet/components/icons/base/Attraction';
import Monitor from 'grommet/components/icons/base/Monitor';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';

class DetailsView extends Component {
  static propTypes = {
    report: PropTypes.object
  }

  render() {
    const {
      report
    } = this.props;

    const { hook, session } = report || {};

    const reportId = report && report.id;

    return (
      <Box
        direction='column'
        size={{height: 'full', width: 'xlarge'}}
        justify='left'
        align='start'
        pad='small'
        colorIndex='light-2'>
        <Heading>
          Details View
        </Heading>
        <Value value={reportId}
          icon={<Book />}
          align='start'
          label='ID' />
        <Value value={hook || 'None'}
          icon={<Attraction />}
          align='start'
          label='Hook' />
        <Value value={session}
          icon={<Monitor />}
          align='start'
          label='Session' />
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
        pad='small'
        size={{height: 'full', width: 'xlarge'}}
        direction='column'>
        <Box direction='row'>
          <Heading>
            {print.name}
          </Heading>
        </Box>
        <Box direction='row'>
            <iframe title={print.type} src={url} width='100%' height="400"></iframe>
        </Box>
      </Box>
    )
  }
}

class ReportView extends Component {
  static propTypes = {
    selectedReport: PropTypes.object,
    isFetchingReport: PropTypes.bool,
    isListening: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedReport } = this.props;
    dispatch(fetchReport(selectedReport.id));
    dispatch(getListenerState());
  }

  toggleListener = () => {
    this.props.dispatch(toggleListenerIfNeeded());
  }

  deleteAllReports = () => {
    this.props.dispatch(deleteAllReportsIfNeeded());
  }

  render() {
    const { selectedReport, isListening, history } = this.props;
    const prints = (selectedReport && selectedReport.prints) || [];

    return (
      <Box direction='column'
        pad='none'
        justify='center'
        size='full'
        colorIndex='light-2'>
        <Box direction='row'
          full='horizontal'>
          <Box direction='column'
            pad='small'>
            <Button icon={<CaretBack />}
              onClick={() => {history.push(BASE_ROUTE)}}
              />
          </Box>
          <Box direction='column' full='horizontal'>
            <TimeHeader
              isListening={isListening}
              toggleListener={this.toggleListener}
              deleteAllReports={this.deleteAllReports} />
          </Box>
        </Box>
        <Box direction='row'
          basis='full'>
          <Tabs responsive={true}>
            <Tab title='Details'>
              <Box direction='column' size='full' >
                <DetailsView report={selectedReport} />
              </Box>
            </Tab>
            { prints.map((print) => (
              <Tab title={print.type} >
                <PrinterView print={print} />
              </Tab>
            ))}
          </Tabs>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
      isFetchingReport
  } = state.reports;

  let { selectedReport } = state.reports;

  const {
    isListening
  } = state.listener;

  const { match } = ownProps;

  const reportId = match.params.id;

  if (!selectedReport || reportId !== selectedReport.id) {
    selectedReport = { id: reportId } ;
  }

  return {
    selectedReport,
    isFetchingReport,
    isListening
  }
}

export default withRouter(connect(mapStateToProps)(ReportView));
