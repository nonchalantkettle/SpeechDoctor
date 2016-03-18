import React from 'react';

export default class RecordingView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      results: '',
    };
  }

  handleClick() {
    this.setState({
      recording: !this.state.recording,
    });
  }

  listener = () => {
    this.handleClick();
    console.log("state", this.state.recording);
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      this.setState({
        results: event.results[0][0].transcript,
      });
      console.log(event.results[0][0].transcript);
    }
    recognition.start();
  }

  render() {
    return (
      <div>
        <button id='speech-record-button' onClick={this.listener}>Click to Record Speech</button>
        <div id='rendered-speech'>{this.state.results}</div>
      </div>
    );
  }
}
