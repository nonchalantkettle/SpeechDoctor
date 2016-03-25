import React from 'react';
import { Link } from 'react-router';
import api from '../utils/api';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmedPassword: '',
      error: false,
      passwordError: false
    };
  }
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
  handleConfirmedPasswordChange(e) {
    this.setState({
      confirmedPassword: e.target.value,
    });
  }
  handleSubmit() {
    if (this.state.password === this.state.confirmedPassword) {
      this.setState({
        passwordError: false,
      });
      api.signup(this.state.username, this.state.password)
        .then((res) => {
          this.setState({
            passwordError: false,
          });
          if (res.status === 500) {
            this.setState({
              error: 'User already exists',
            });
          } else {
            this.setState({
              error: false,
              username: '',
              password: '',
            });
            // redirect to main landing page
          }
        }).catch((err) => {
          this.setState({
            error: 'User already exists' + err,
          });
        });
    } else {
      this.setState({
        error: false,
        passwordError: 'Passwords don\'t match',
      });
    }
  }
  render() {
    const showErr = (
      this.state.error ? <p>{this.state.error}</p> : <div></div>
    );
    const showPasswordErr = (
      this.state.passwordError ? <p>{this.state.passwordError}</p> : <div></div>
    );
    return (
      <div>
        <h1>Create an Account</h1>
        <div id="createAccount">
          <form id="signup" onSubmit={this.handleSubmit.bind(this)}>
            <div>Username
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleUsernameChange.bind(this)}>
              </input>
            </div>
            <div>Password
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}>
              </input>
            </div>
            <div>Confirm Password
              <input
                type="text"
                name="confirmedPassword"
                value={this.state.confirmedPassword}
                onChange={this.handleConfirmedPasswordChange.bind(this)}>
              </input>
            </div>
            <div>
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
        {showErr}
        {showPasswordErr}
        <div>
          <p>Already have an account? Sign in <Link to={'login'}>here</Link></p>
        </div>
      </div>
    );
  }
}
