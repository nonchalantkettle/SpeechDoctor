/* eslint-disable no-use-before-define, react/prefer-stateless-function */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import TextView from './TextView.jsx';
import SpeechView from './SpeechView.jsx';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';
import Nav from './Nav.jsx';
import LandingPage from './LandingPage.jsx';

import api from '../utils/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userLoggedIn: false,
    };
  }

  setUserLoggedIn(username) {
    console.log(' user??? ', username);
    this.setState({
      user: username,
      userLoggedIn: true,
    });
  }

  setUserLoggedOut() {
    this.setState({
      userLoggedIn: false,
    });
  }

  render() {
    const Children = React.cloneElement(this.props.children,
      { userLoggedIn: this.state.userLoggedIn,
        setUserLoggedIn: this.setUserLoggedIn.bind(this),
        setUserLoggedOut: this.setUserLoggedOut.bind(this),
      });
    return (
      <div>
        <Nav userLoggedIn={this.state.userLoggedIn} />
        {Children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="/speech" component={SpeechView} />
      <Route path="/text" component={TextView} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
    </Route>
  </Router>,
  document.getElementById('app')
);
