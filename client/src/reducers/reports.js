import {
  INVALIDATE_REPORTS,
  REQUEST_REPORTS,
  RECEIVE_REPORTS_SUCCESS,
  RECEIVE_REPORTS_FAILURE,
  SELECT_REPORT,
  REQUEST_REPORT,
  RECEIVE_REPORT_SUCCESS,
  RECEIVE_REPORT_FAILURE
} from '../actions';

const initialState = {
  isFetching: false,
  isFetchingReport: false,
  didInvalidate: true,
  reports: [],
  selectedReport: undefined
};

const reports = (state=initialState, action) => {
  switch (action.type) {
    case INVALIDATE_REPORTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_REPORTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_REPORTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        reports: action.reports,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_REPORTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        reports: action.reports,
        errors: action.errors,
        lastUpdated: action.receivedAt
      }
    case SELECT_REPORT:
      return {
        ...state,
        selectedReport: action.selectedReport
      }
    case REQUEST_REPORT:
      return {
        ...state,
        isFetchingReport: true,
        selectedReport: action.selectedReport
      }
    case RECEIVE_REPORT_SUCCESS:
      return {
        ...state,
        isFetchingReport: false,
        selectedReport: action.selectedReport
      }
    case RECEIVE_REPORT_FAILURE:
      return {
        ...state,
        isFetchingReport: false,
        selectedReport: action.selectedReport,
        errors: action.errors
      }
    default:
      return state;
  }
};

export default reports;
