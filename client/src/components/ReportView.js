import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchReport,
  getListenerState,
  toggleListenerIfNeeded
} from '../actions';

import TimeHeader from './TimeHeader';

import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Book from 'grommet/components/icons/base/Book';
import Attraction from 'grommet/components/icons/base/Attraction';
import Monitor from 'grommet/components/icons/base/Monitor';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';

class DetailsView extends Component {
  static propTypes = {
    report: PropTypes.object,
    title: PropTypes.node,
    active: PropTypes.bool,
    id: PropTypes.string,
    onRequestForActive: PropTypes.func
  }

  render() {
    const {
      id,
      active,
      title,
      onRequestForActive,
      report,
      children
    } = this.props;

    const { hook, session } = report || {};

    const reportId = report && report.id;

    return (
      <Tab title={title} active={active} id={id} onRequestForActive={onRequestForActive}>
        <Box direction='column'
          flex={true}
          justify='left'
          align='center'
          size='medium'
          colorIndex='accent-2'>
          <Paragraph>
            Details View
          </Paragraph>
          <Value value={reportId}
            icon={<Book />}
            label='ID'
            units='uuid' />
          <Value value={hook}
            icon={<Attraction />}
            label='Hook' />
          <Value value={session}
            icon={<Monitor />}
            label='Session' />
        </Box>
      </Tab>
    )
  }
}



class PrinterView extends Component {
  static propTypes = {
    print: PropTypes.object,
    title: PropTypes.node,
    active: PropTypes.bool,
    id: PropTypes.string,
    onRequestForActive: PropTypes.func
  }
  debugger

  render() {
    const {
      id,
      active,
      onRequestForActive,
      print,
      children
    } = this.props;

    return (
      <Tab title={ print.type } active={active} id={id} onRequestForActive={onRequestForActive}>
        <Paragraph>
          {print.name}
        </Paragraph>
        <iframe title={print.type} src={print.url}></iframe>
      </Tab>
    )
  }
}



const BackButton = withRouter(({history, to, label}) => (
  <Button icon={<CaretBack />}
    label={label}
    onClick={() => {history.push(to)}}
    secondary={true}
    />
))

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

  render() {
    const { selectedReport, isListening, history } = this.props;
    const prints = (selectedReport && selectedReport.prints) || [];

    return (
      <Box direction='column'
        flex={true}
        pad='none'
        justify='center'
        colorIndex='light-2'>
        <TimeHeader
          isListening={isListening}
          toggleListener={this.toggleListener} />
        <BackButton history={history} to="/" label="Back" />
        <Box
          direction='row'
          flex={true}
          align='start'
          size='full'
          basis='medium'
          colorIndex='neutral-1-a'>
          <Tabs>
            <DetailsView title='Details' report={selectedReport} />
            { prints.map((print) => (
              <PrinterView print={print} />
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
