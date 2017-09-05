import {
  REQUEST_LISTENER_STATE,
  RECEIVE_LISTENER_STATE,
  REQUEST_LISTENER_ENABLE,
  RECEIVE_LISTENER_ENABLE,
  REQUEST_LISTENER_DISABLE,
  RECEIVE_LISTENER_DISABLE
} from '../actions';

const listenerState = {
  isListening: false,
  isTogglingListener: false
};

const listener = (state=listenerState, action) => {
  switch (action.type) {
    case REQUEST_LISTENER_STATE:
      return {
        ...state,
        isTogglingListener: true
      }
    case RECEIVE_LISTENER_STATE:
      return {
        ...state,
        isListening: action.listenerEnabled,
        isTogglingListener: false
      }
    case REQUEST_LISTENER_ENABLE:
      return {
        ...state,
        isTogglingListener: true
      }
    case RECEIVE_LISTENER_ENABLE:
      return {
        ...state,
        isListening: action.listenerEnabled,
        isTogglingListener: false
      }
    case REQUEST_LISTENER_DISABLE:
      return {
        ...state,
        isTogglingListener: true
      }
    case RECEIVE_LISTENER_DISABLE:
      return {
        ...state,
        isListening: action.listenerEnabled,
        isTogglingListener: false
      }
    default:
      return state;
  }
};

export default listener;
