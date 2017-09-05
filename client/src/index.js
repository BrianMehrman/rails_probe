import React from 'react';
import { render } from 'react-dom';

import  { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';

import storeBuilder from './store';
import App from './containers/App';
import ReportShow from './containers/ReportShow';

import '../node_modules/grommet/grommet-hpe.min.css';
import './index.css';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const store = storeBuilder();

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

render(
  <Provider store={store}>
    <Router history={history} >
      <div>
        <Route exact path='/' component={App} />
        <Route path='/:id' component={ReportShow} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
