import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reports from './reports';
import listener from './listener';

export default combineReducers({ listener, reports, router: routerReducer });
