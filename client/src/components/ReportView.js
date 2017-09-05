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

const DetailsView = (report) => {
  return (
    <Tab
      title='Details'
      >
      <Box direction='column'
           flex={true}
           justify='left'
           align='center'
           size='medium'
           colorIndex='accent-2'>
       <Paragraph>
         Details View
       </Paragraph>
        <Value value={report.id}
          icon={<Book />}
          label='ID'
          units='uuid' />
        <Value value={report.hook}
          icon={<Attraction />}
          label='Hook' />
        <Value value={report.session}
          icon={<Monitor />}
          label='Session' />
      </Box>
    </Tab>
  )
}

const PrinterView = (printer) => {
  return (
    <Tab
      title={ printer.type }
      basis='medium'>
      <Paragraph>
      {printer.name}
      </Paragraph>
      <iframe
        src={printer.url}></iframe>
    </Tab>
  )
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
    reportId: PropTypes.string,
    report: PropTypes.object,
    isFetchingReport: PropTypes.bool,
    isListening: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, reportId } = this.props;
    dispatch(fetchReport(reportId));
    dispatch(getListenerState());
  }

  toggleListener = () => {
    this.props.dispatch(toggleListenerIfNeeded());
  }

  render() {
    const {report, isListening, history} = this.props;
    const printers = (report && report.printers) || [];
debugger
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
            <DetailsView report={report} />
            { printers.map((printer) => (
              <PrinterView printer={printer} />
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

  const {
    isListening
  } = state.listener;

  let reportId = ownProps.id;
debugger
  return {
    reportId,
    isFetchingReport,
    isListening
  }
}

export default connect(mapStateToProps)(ReportView);
