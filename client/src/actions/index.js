import Report from '../models/Report.js'

// ROUTES
// =====================
export const BASE_ROUTE = '/rails_probe';

// Actions
// =====================
export const REQUEST_LISTENER_STATE = 'REQUEST_LISTENER_STATE';
export const RECEIVE_LISTENER_STATE = 'RECEIVE_LISTENER_STATE';
export const REQUEST_LISTENER_ENABLE = 'REQUEST_LISTENER_ENABLE';
export const RECEIVE_LISTENER_ENABLE = 'RECEIVE_LISTENER_ENABLE';
export const REQUEST_LISTENER_DISABLE = 'REQUEST_LISTENER_DISABLE';
export const RECEIVE_LISTENER_DISABLE = 'RECEIVE_LISTENER_DISABLE';
export const REQUEST_LISTENER_CONFIG = 'REQUEST_LISTENER_CONFIG';
export const RECEIVE_LISTENER_CONFIG = 'RECEIVE_LISTENER_CONFIG';
export const REQUEST_POST_LISTENER_CONFIG = 'REQUEST_POST_LISTENER_CONFIG';
export const RECEIVE_POST_LISTENER_CONFIG = 'RECEIVE_POST_LISTENER_CONFIG';
export const SELECT_REPORT = 'SELECT_REPORT';
export const REQUEST_REPORT = 'REQUEST_REPORT';
export const RECEIVE_REPORT_SUCCESS = 'RECEIVE_REPORT_SUCCESS';
export const RECEIVE_REPORT_FAILURE = 'RECEIVE_REPORT_FAILURE';
export const REQUEST_REPORTS = 'REQUEST_REPORTS';
export const RECEIVE_REPORTS_SUCCESS = 'RECEIVE_REPORTS_SUCCESS';
export const RECEIVE_REPORTS_FAILURE = 'RECEIVE_REPORTS_FAILURE';
export const REQUEST_DELETE_ALL_REPORTS = 'REQUEST_DELETE_ALL_REPORTS';
export const RECEIVE_DELETE_ALL_REPORTS_SUCCESS = 'RECEIVE_DELETE_ALL_REPORTS_SUCCESS';
export const RECEIVE_DELETE_ALL_REPORTS_FAILURE = 'RECEIVE_DELETE_ALL_REPORTS_FAILURE';
export const INVALIDATE_REPORTS = 'INVALIDATE_REPORTS';
export const TOGGLE_RAILS_PROBE = 'TOGGLE_RAILS_PROBE';


//    Listener
// =====================

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

export const requestListenerConfig = () => ({
  type: REQUEST_LISTENER_CONFIG
})

export const receiveListenerConfig = (json) => ({
  type: RECEIVE_LISTENER_CONFIG,
  listenerConfig: json
})

export const requestPostListenerConfig = () => ({
  type: REQUEST_POST_LISTENER_CONFIG
})

export const receivePostListenerConfig = (json) => ({
  type: RECEIVE_POST_LISTENER_CONFIG,
  listenerConfig: json
})

//    Reports
// =====================

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
  selectedReport: new Report(json),
  receivedAt: Date.now()
})

export const receiveReportFailure = (json, errors) => ({
  type: RECEIVE_REPORT_FAILURE,
  selectedReport: new Report(json),
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

export const requestDeleteAllReports = () => ({
  type: REQUEST_DELETE_ALL_REPORTS
})

export const receiveDeleteAllReportsSuccess = (json) => ({
  type: RECEIVE_DELETE_ALL_REPORTS_SUCCESS,
  receivedAt: Date.now(),
  json
})

export const receiveDeleteAllReportsFailure = (json, errors) => ({
  type: RECEIVE_DELETE_ALL_REPORTS_FAILURE,
  receivedAt: Date.now(),
  json,
  errors
})

//   Local Methods
// =====================

const shouldToggleListener = (isTogglingListener) => {
  if (isTogglingListener) {
    return false;
  }
  return true;
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

const shouldDeleteReports = (isDeletingReports) => {
  if (isDeletingReports) {
    return false;
  }
  return true;
}

const shouldPostListenerConfig = (isPostingListenerConfig) => {
  if (isPostingListenerConfig) {
    return false;
  }
  return true;
}

const postListenerConfig = (config) => {
  return (dispatch, getState) => {
    const state = getState();
    const { isPostingListenerConfig } = state.listener;

    if (!isPostingListenerConfig) {
      dispatch(requestPostListenerConfig());

      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      };

      const request = new Request(`${BASE_ROUTE}/listener/config`, params);

      fetch(request)
        .then(response => response.json())
        .then(json => dispatch(receivePostListenerConfig(json)))
    }
  }
}

const toggleListener = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { isListening } = state.listener;

    if (!isListening) {
      dispatch(requestListenerEnable());

      const request = new Request(`${BASE_ROUTE}/listener/on`, { method: 'GET' });

      fetch(request)
        .then(response => response.json())
        .then(json => dispatch(receiveListenerEnable(json)))
    }
    else {
      dispatch(requestListenerDisable());

      const request = new Request(`${BASE_ROUTE}/listener/off`, { method: 'GET' });

      fetch(request)
        .then(response => response.json())
        .then(json => dispatch(receiveListenerDisable(json)))
    }
  }
}

const deleteAllReports = () => {
  return (dispatch) => {
    dispatch(requestDeleteAllReports());

    const request = new Request(`${BASE_ROUTE}/reports/remove`, { method: 'DELETE' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveDeleteAllReportsSuccess(json)))
      .catch(error => dispatch(receiveDeleteAllReportsFailure({  errors: [error] }, error.message)));

  }
}


// Dispatch Methods
// =====================
export const postListenerConfigIfNeeded = (config) => (dispatch, getState) => {
  const state = getState();
  const { isPostingListenerConfig } = state.listener;

  if (shouldPostListenerConfig(isPostingListenerConfig)) {
    return dispatch(postListenerConfig(config));
  }
}

export const toggleListenerIfNeeded = () => (dispatch, getState) => {
  const state = getState();
  const { isTogglingListener } = state.listener;

  if (shouldToggleListener(isTogglingListener)) {
    return dispatch(toggleListener());
  }
}

export const deleteAllReportsIfNeeded = () => (dispatch, getState) => {
  const state = getState();
  const { isDeletingReports } = state.reports;

  if (shouldDeleteReports(isDeletingReports)) {
    return dispatch(deleteAllReports());
  }
}

export const fetchReportsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchReports(getState())) {
    return dispatch(fetchReports());
  }
}

export const getListenerConfig = () => {
  return (dispatch) => {
    dispatch(requestListenerConfig());

    const request = new Request(`${BASE_ROUTE}/listener/config`, { method: 'GET' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveListenerConfig(json)));
  }
}

export const getListenerState = () => {
  return (dispatch) => {
    dispatch(requestListenerState());

    const request = new Request(`${BASE_ROUTE}/listener`, { method: 'GET' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveListenerState(json)));
  }
}

export const fetchReport = (id) => {
  return (dispatch) => {
    dispatch(requestReport(id));

    const request = new Request(`${BASE_ROUTE}/reports/${id}`, { method: 'GET' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveReportSuccess(json)))
      .catch(error => dispatch(receiveReportFailure({ id: id, errors: [error] }, error.message)));
  }
}

export const fetchReports = () => {
  return (dispatch) => {
    dispatch(requestReports());

    const request = new Request(`${BASE_ROUTE}/reports`, { method: 'GET' });

    fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveReportsSuccess(json)))
      .catch(error => dispatch(receiveReportsFailure([], error.message)));
  }
}
