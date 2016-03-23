/* global webkitSpeechRecognition */
/* eslint new-cap: 0 */

import React from 'react';
import SpeechAnalytics from './SpeechAnalytics.jsx';

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

export default class SpeechView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      results: '',
      showTranscript: false,
      passedTest: false,
    };
  }

  handleClick() {
    if (!this.state.recording) {
      this.setState({
        results: '',
      });
    }
    this.listener();
    this.setState({
      recording: !this.state.recording,
    });
  }

  displayTranscript() {
    this.setState({
      showTranscript: !this.state.showTranscript,
    });
  }

  listener() {
    if (this.state.recording) {
      recognition.stop();
      return;
    }
    recognition.onresult = (event) => {
      let returnedTranscript = '';
      const threshold = 0.85;
      let confidence = true;

      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i][0].transcript.split(' ').length === 20) {
          if (event.results[i][0].confidence > threshold) {
            this.setState({
              passedTest: true,
            });
          }
        }

        if (event.results[i][0].confidence < threshold) {
          confidence = false;
        } else {
          confidence = true;
        }
        returnedTranscript += event.results[i][0].transcript;
      }

      this.setState({
        results: returnedTranscript,
        clearHearing: confidence,
      });
    };
    recognition.start();
  }

  render() {
    const testingView = this.state.passedTest ?
    <div></div> :
      <div><h3>Before we get started, we want to make sure we can hear you</h3></div>;

    const currentState =
      this.state.recording ? <div>Recording...</div> : <div>Start recording now</div>;

    const handleClick = this.handleClick.bind(this);

    const displayTranscript = this.displayTranscript.bind(this);

    const showDisplayTranscriptButton = !this.state.showTranscript ?
      <button onClick={displayTranscript}>Display Transcript</button> :
      <button onClick={displayTranscript}>Hide Transcript</button>;

    const transcript =
      this.state.showTranscript || (!this.state.passedTest) ?
        <div id="rendered-speech">Here is the transcript: {this.state.results}</div> :
        <div>No transcript for now</div>;
          
    return (
      <div>
        <div id="speech-input">
          {testingView}
          <div id="recording-view">
            <button className="record-button" onClick={handleClick}>
              <img id="record-img" src="assets/record.png" alt="record" />
            </button>
            <img id="record-img" src="assets/play.png" alt="play" />
            <img id="record-img" src="assets/pause.png" alt="pause" />
          </div>
        </div>
        <div>
          <span>{currentState}</span>
          {showDisplayTranscriptButton}
        </div>
        <div>
          {transcript}
        </div>
        <div>
          <SpeechAnalytics />
        </div>
      </div>
    );
  }
}
