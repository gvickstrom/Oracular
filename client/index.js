import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

//components
import App from './components/App';
import Default404 from './components/Default404';
import Landing from './components/Landing';
import Ticker from './components/Ticker';
import Filter from './components/Filter';
import Graph from './components/Graph';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="/Ticker" component={Ticker} />
      <Route path="/Filter" component={Filter} />
      <Route path="/Graph" component={Graph} />
    </Route>
  </Router>
  , document.getElementById('root')
);
