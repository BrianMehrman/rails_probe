import Report from '../models/Report.js'
const BASE_ROUTE = 'rails_probe';

// Actions
// =====================
export const REQUEST_LISTENER_STATE = 'REQUEST_LISTENER_STATE';
export const RECEIVE_LISTENER_STATE = 'RECEIVE_LISTENER_STATE';
export const REQUEST_LISTENER_ENABLE = 'REQUEST_LISTENER_ENABLE';
export const RECEIVE_LISTENER_ENABLE = 'RECEIVE_LISTENER_ENABLE';
export const REQUEST_LISTENER_DISABLE = 'REQUEST_LISTENER_DISABLE';
export const RECEIVE_LISTENER_DISABLE = 'RECEIVE_LISTENER_DISABLE';
export const SELECT_REPORT = 'SELECT_REPORT';
export const REQUEST_REPORT = 'REQUEST_REPORT';
export const RECEIVE_REPORT_SUCCESS = 'RECEIVE_REPORT_SUCCESS';
export const RECEIVE_REPORT_FAILURE = 'RECEIVE_REPORT_FAILURE';
export const REQUEST_REPORTS = 'REQUEST_REPORTS';
export const RECEIVE_REPORTS_SUCCESS = 'RECEIVE_REPORTS_SUCCESS';
export const RECEIVE_REPORTS_FAILURE = 'RECEIVE_REPORTS_FAILURE';
export const INVALIDATE_REPORTS = 'INVALIDATE_REPORTS';
export const TOGGLE_RAILS_PROBE = 'TOGGLE_RAILS_PROBE';


//----------------------
//    Listener
//----------------------

export const requestListenerState = () => ({
  type: REQUEST_LISTENER_STATE
})

export const receiveListenerState = (json) => ({
  type: RECEIVE_LISTENER_STATE,
  listenerEnabled: json.listening
})

export const requestListenerEnable = () => ({
  type: REQUEST_LISTENER_ENABLE
})

export const receiveListenerEnable = (json) => ({
  type: RECEIVE_LISTENER_ENABLE,
  listenerEnabled: json.listening
})

export const requestListenerDisable = () => ({
  type: REQUEST_LISTENER_DISABLE
})

export const receiveListenerDisable = (json) => ({
  type: RECEIVE_LISTENER_DISABLE,
  listenerEnabled: json.listening
})

//----------------------
//    Reports
//----------------------

export const selectReport = (id) => ({
  type: SELECT_REPORT,
  selectedReport: { id: id }
})

export const requestReport = (id) => ({
  type: REQUEST_REPORT,
  selectedReport: { id: id }
})

export const receiveReportSuccess = (json) => ({
  type: RECEIVE_REPORT_SUCCESS,
  report: json,
  receivedAt: Date.now()
})

export const receiveReportFailure = (json, errors) => ({
  type: RECEIVE_REPORT_FAILURE,
  report: json,
  receivedAt: Date.now(),
  errors
})

export const requestReports = () => ({
  type: REQUEST_REPORTS
})

export const receiveReportsSuccess = (json) => ({
  type: RECEIVE_REPORTS_SUCCESS,
  reports: json.map((report) => new Report(report)),
  receivedAt: Date.now()
})

export const receiveReportsFailure = (json, errors) => ({
  type: RECEIVE_REPORTS_SUCCESS,
  reports: json.map((report) => new Report(report)),
  receivedAt: Date.now(),
  errors
})

// ------------------------------- //

const shouldToggleListener = (isTogglingListener) => {
  if (isTogglingListener) {
    return false;
  }
  return true;
}

export const toggleListenerIfNeeded = () => (dispatch, getState) => {
  const state = getState();
  const { isTogglingListener } = state.listener;

  if (shouldToggleListener(isTogglingListener)) {
    return dispatch(toggleListener());
  }
}

export const getListenerState = () => {
  return (dispatch) => {
    dispatch(requestListenerState());

    const request = new Request( `${BASE_ROUTE}/listener`, { method: 'GET' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveListenerState(json)))
  }
}

const toggleListener = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { isListening } = state.listener;

    if (!isListening) {
      dispatch(requestListenerEnable());

      const request = new Request( `${BASE_ROUTE}/listener/on`, { method: 'GET' });

      fetch(request)
        .then(response => response.json())
        .then(json => dispatch(receiveListenerEnable(json)))
    }
    else {
      dispatch(requestListenerDisable());

      const request = new Request( `${BASE_ROUTE}/listener/off`, { method: 'GET' });

      fetch(request)
        .then(response => response.json())
        .then(json => dispatch(receiveListenerDisable(json)))
    }
  }
}

const shouldFetchReports = (state) => {
  const {reports, isFetching, didInvalidate } = state.reports;

  if (!reports) {
    return true
  }
  if (isFetching) {
    return false
  }
  return didInvalidate
}

export const fetchReportsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchReports(getState())) {
    return dispatch(fetchReports());
  }
}

export function fetchReport(id) {
  return (dispatch) => {
    dispatch(requestReport(id));
console.log(id);
    const request = new Request( `${BASE_ROUTE}/reports/${id}`, { method: 'GET' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveReportSuccess(json)))
      .catch(error => dispatch(receiveReportFailure({ id: id, errors: [error] }, error.message)));
  }
}

export function fetchReports() {
  return (dispatch) => {
    dispatch(requestReports());

    const request = new Request( `${BASE_ROUTE}/reports`, { method: 'GET' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveReportsSuccess(json)))
      .catch(error => dispatch(receiveReportsFailure([], error.message)));
  }
}
