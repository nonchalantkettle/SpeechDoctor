/* eslint-disable react/jsx-boolean-value */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import $ from 'jquery';
import { Grid, Row } from 'react-bootstrap';

import TextView from './Text/TextView.jsx';
import SpeechView from './Speech/SpeechView.jsx';
import UserProfile from './Profile/UserProfile.jsx';
import SignUp from './Auth/SignUp.jsx';
import LogIn from './Auth/LogIn.jsx';
import Nav from './Nav.jsx';
import LandingPage from './Home/LandingPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userLoggedIn: false,
    };
  }

  setUserLoggedIn(username) {
    this.setState({
      user: username,
      userLoggedIn: true,
    });
  }

  setUserLoggedOut() {
    $('h1').append('<div><p>You have been logged out.</p></div>');
    this.setState({
      userLoggedIn: false,
    });
  }

  render() {
    const Children = React.cloneElement(this.props.children, {
      user: this.state.user,
      userLoggedIn: this.state.userLoggedIn,
      setUserLoggedIn: this.setUserLoggedIn.bind(this),
      setUserLoggedOut: this.setUserLoggedOut.bind(this),
    });
    const logout = this.setUserLoggedOut.bind(this);
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Nav userLoggedIn={this.state.userLoggedIn} logout={logout} />
          </Row>
          {Children}
        </Grid>
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
      <Route path="/profile" component={UserProfile} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
    </Route>
  </Router>,
  document.getElementById('app')
);
