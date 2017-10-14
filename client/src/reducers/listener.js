import {
  REQUEST_LISTENER_STATE,
  RECEIVE_LISTENER_STATE,
  REQUEST_LISTENER_ENABLE,
  RECEIVE_LISTENER_ENABLE,
  REQUEST_LISTENER_DISABLE,
  RECEIVE_LISTENER_DISABLE,
  REQUEST_LISTENER_CONFIG,
  RECEIVE_LISTENER_CONFIG,
  RECEIVE_POST_LISTENER_CONFIG,
  REQUEST_POST_LISTENER_CONFIG
} from '../actions';

const listenerState = {
  isListening: false,
  isTogglingListener: false,
  isPostingListenerConfig: false,
  listenerConfig: {
    graphText: false,
    graphHtml: false,
    callStack: false
  }
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
    case REQUEST_LISTENER_CONFIG:
      return state
    case RECEIVE_LISTENER_CONFIG:
      return {
        ...state,
        listenerConfig: action.listenerConfig
      }
    case REQUEST_POST_LISTENER_CONFIG:
      return {
        ...state,
        isPostingListenerConfig: true
      }
    case RECEIVE_POST_LISTENER_CONFIG:
      return {
        ...state,
        isPostingListenerConfig: false,
        listenerConfig: action.listenerConfig
      }
    default:
      return state;
  }
};

export default listener;
