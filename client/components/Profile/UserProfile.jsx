import React from 'react';
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
    let data = [];
    $.get('/text', { username: this.props.user })
    .done((textData) => {
      data = textData;
      $.get('/speech', { username: this.props.user })
      .done((speechData) => {
        speechData.map((speech) => data.push(speech));
        this.setState({
          showAnalytics: true,
          data,
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
    return (
      <div id="analytics-container">
        {
          this.state.showAnalytics ?
          <UserAnalytics data={this.state.data} /> : <p>Loading Statistics...</p>
        }
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: React.PropTypes.string,
};
