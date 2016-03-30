import React from 'react';
import UserAnalytics from './UserAnalytics.jsx';
import $ from 'jquery';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnalytics: false,
      data: [],
    };
  }

  handleTextClick() {
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

  // handleSpeechClick() {
  //   $.get('/speech', { username: this.props.user })
  //     .done((data) => {
  //       this.setState({
  //         showAnalytics: true,
  //         data: data,
  //       });
  //     })
  //     .fail((err) => {
  //       throw new Error('Could not retrieve text information', err);
  //     });
  // }

  render() {
    const onTextClick = this.handleTextClick.bind(this);
    // const onSpeechClick = this.handleSpeechClick.bind(this);

    return (
      <div>
        <button onClick={onTextClick}>Analytics</button>
        {
          this.state.showAnalytics ?
          <UserAnalytics data={this.state.data} /> :
          <div></div>
        }
      </div>
    );
  }

}

UserProfile.propTypes = {
  user: React.PropTypes.string,
};
