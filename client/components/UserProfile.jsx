import React from 'react';
import UserAnalytics from './UserAnalytics.jsx';
import $ from 'jquery';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextAnalytics: true,
      textData: [],
    };
  }

  handleTextClick() {
    $.get('/text', { username: this.props.user })
      .done((data) => {
        this.setState({
          showTextAnalytics: true,
          textData: data,
        });
      })
      .fail((err) => {
        throw new Error('Could not retrieve text information', err);
      });
  }

  handleSpeechClick() {
    this.setState({
      showTextAnalytics: false,
    });
  }

  render() {
    const onTextClick = this.handleTextClick.bind(this);
    const onSpeechClick = this.handleSpeechClick.bind(this);
    return (
      <div>
        <button onClick={onTextClick}>Text Analytics</button>
        <button onClick={onSpeechClick}>Speech Analytics</button>
        <UserAnalytics textData={this.state.textData} />
      </div>
    );
  }

}

UserProfile.propTypes = {
  user: React.PropTypes.string,
};
