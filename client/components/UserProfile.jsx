import React from 'react';
import UserAnalytics from './UserAnalytics.jsx';
import $ from 'jquery';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextAnalytics: true,
    };
  }

  handleTextClick() {
    $.get('/text', { username: this.props.user })
      .done((data) => data);
    this.setState({
      showTextAnalytics: true,
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
        <UserAnalytics />
      </div>
    );
  }

}

UserProfile.propTypes = {
  user: React.PropTypes.string,
};
