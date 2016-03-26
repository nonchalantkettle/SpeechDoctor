import React from 'react';
import { Link } from 'react-router';
import api from '../utils/api';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
    };
  }

  // check for JWT token match
    // if match, redirect to landing page

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.login(this.state.username, this.state.password)
      .then((res) => {
        console.log("RES IN LOGIN --- ", res);
        if (res.status === 500) {
          this.setState({
            error: 'Username or password is incorrect',
          });
        } else {
          // load the JSON Web token into the keychain
          // var bodyText = JSON.parse(res._bodyText);
          // Keychain.setGenericPassword(null, bodyText.token)
          // console.log('Credentials saved successfully!', bodyText.userId, bodyText.token);
          // redirect
          this.setState({
            isLoading: false,
            error: false,
            username: '',
            password: '',
          });
          window.location.href = 'http://localhost:8080/';
        }
      })
      .catch((err) => {
        this.setState({
          error: 'User not found - ', err,
        });
      });
  }

  render() {
    const showErr = (
      this.state.error ? <p>{this.state.error}</p> : <p></p>
    );
    const methods = {
      handleSubmit: this.handleSubmit.bind(this),
      handleUsernameChange: this.handleUsernameChange.bind(this),
      handlePasswordChange: this.handlePasswordChange.bind(this),
    };
    return (
      <div>
        <h1>Log In</h1>
        <div id="accountLogin">
         <form id="login" onSubmit={methods.handleSubmit}>
            <div>Username
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={methods.handleUsernameChange}
              >
              </input>
            </div>
            <div>Password
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={methods.handlePasswordChange}
              >
              </input>
            </div>
            <div><button type="submit">Log In</button></div>
          </form>
        </div>
        {showErr}
        <div>
          <p>Need have an account? Create one <Link to={'signup'}>here</Link></p>
        </div>
      </div>
    );
  }
}
