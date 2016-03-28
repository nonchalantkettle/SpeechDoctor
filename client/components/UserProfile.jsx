import React from 'react';
import UserAnalytics from './UserAnalytics.jsx';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextAnalytics: true,
    };
  }

  handleTextClick() {
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
