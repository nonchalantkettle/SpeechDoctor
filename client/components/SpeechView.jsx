import React from 'react';

export default class SpeechView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
    };
  }

  handleClick() {
    this.setState({
      showText: true,
    });
  }

  render() {
    return (
      <h1>Speech View!</h1>
    );
  }
}
