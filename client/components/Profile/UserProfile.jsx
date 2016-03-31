import React from 'react';
import $ from 'jquery';

import UserAnalytics from './UserAnalytics.jsx';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showAnalytics: false,
    };
  }

  componentWillMount() {
    let data = [];
    $.get('/text', { username: this.props.user })
    .done((textData) => {
      data = textData;
      $.get('/speech', { username: this.props.user })
      .done((speechData) => {
        speechData.map((speech) => data.push(speech));
        this.setState({
          data,
          showAnalytics: true,
        });
      })
      .fail((err) => {
        throw new Error('Unable to retrieve speeches stored!', err);
      });
    })
    .fail((err) => {
      throw new Error('Unable to retrieve texts stored!', err);
    });
  }

  render() {
    const displayAnalytics =
      this.state.showAnalytics ? <UserAnalytics data={this.state.data} /> : <p>Loading Statistics...</p>;

    return (
      <div id="analytics-container">
        { displayAnalytics }
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: React.PropTypes.string,
};
