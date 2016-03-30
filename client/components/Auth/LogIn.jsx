import React from 'react';
import { Link } from 'react-router';
import api from '../utils/api';
import { Row, Col } from 'react-bootstrap';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
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

  handleSubmit(e) {
    e.preventDefault();
    api.login(this.state.username, this.state.password)
      .then((res) => {
        if (res.status === 500) {
          this.setState({
            error: 'Username or password is incorrect',
          });
        } else {
          this.props.setUserLoggedIn(this.state.username);
          this.setState({
            isLoading: false,
            error: false,
            username: '',
            password: '',
          });
          this.props.history.push('/');
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
        <Row>
          <Col md={12}>
            <h1>Log In</h1>
            <div id="accountLogin">
             <form id="login" onSubmit={methods.handleSubmit}>
                <div id="inputField">Username
                  <input
                    id="loginInput"
                    className="inputForm"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={methods.handleUsernameChange}
                  >
                  </input>
                </div>
                <div id="inputField">Password
                  <input
                    id="loginInput"
                    className="inputForm"
                    type="text"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={methods.handlePasswordChange}
                  >
                  </input>
                </div>
                <div><button type="submit">Log In</button></div>
              </form>
            </div>
          </Col>
        </Row>
        <Row>
          {showErr}
          <div id="goToSignup">
            <p>Need have an account? Create one <Link to={'signup'}>here.</Link></p>
          </div>
        </Row>
      </div>
    );
  }
}

LogIn.propTypes = {
  setUserLoggedIn: React.PropTypes.func,
  history: React.PropTypes.object,
  'history.push': React.PropTypes.func,
};
