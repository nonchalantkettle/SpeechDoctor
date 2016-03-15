import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from '../client/components/App.jsx'
import TextView from '../client/components/TextView.jsx'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
      <Route path="/text" component={TextView}/>
  </Router>
), document.getElementById('app'))
