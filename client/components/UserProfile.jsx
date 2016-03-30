import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import UserAnalytics from './UserAnalytics.jsx';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnalytics: false,
      data: [],
    };
  }

  componentWillMount() {
    $.get('/text', { username: this.props.user })
    .done((data) => {
      this.setState({
        showAnalytics: true,
        data,
      });
    })
    .fail((err) => {
      throw new Error('Could not retrieve text information', err);
    });
  }

  render() {
    return (
      <div id="analytics-container">
        {
          this.state.showAnalytics ?
          <UserAnalytics data={this.state.data} /> :
          <p>
            <Link to="signup">Sign up </Link>or <Link to="login">log in </Link>to view your profile
          </p>
        }
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: React.PropTypes.string,
};
