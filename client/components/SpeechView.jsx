/* global webkitSpeechRecognition */
/* eslint new-cap: 0 */

import React from 'react';
import SpeechAnalytics from './SpeechAnalytics.jsx';

export default class SpeechView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      results: '',
      showTranscript: false,
      clearHearing: true,
    };
  }

  handleClick() {
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
    const recognition = new webkitSpeechRecognition();
    if (this.state.recording) {
      recognition.abort();
      recognition.stop();
      return;
    }
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let returnedTranscript = '';
      const threshold = 0.75;
      let confidence = true;

      for (let i = 0; i < event.results.length; i++) {
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
    const hearingClearly =
      this.state.clearHearing ? <div></div> :
      <div>Sorry, we are having trouble understanding you{'\n'}Please speak more clearly</div>;

    const currentState =
      this.state.recording ? <div>Recording...</div> : <div>Start recording now</div>;

    const handleClick = this.handleClick.bind(this);

    const displayTranscript = this.displayTranscript.bind(this);

    const showDisplayTranscriptButton = !this.state.recording ?
       <button onClick={displayTranscript}>Display Transcript</button> :
       <div></div>;

    const transcript =
      this.state.showTranscript ?
        <div id="rendered-speech">Here is the transcript: {this.state.results}</div> :
        <div>No transcript for now</div>;
    return (
      <div>
        <div id="speech-input">
          <div id="recording-view">
            <button className="record-button" onClick={handleClick}>
              <img id="record-img" src="assets/record.png" alt="record" />
            </button>
            <div>
              {showDisplayTranscriptButton}
            </div>
            <img id="record-img" src="assets/play.png" alt="play" />
            <img id="record-img" src="assets/pause.png" alt="pause" />
          </div>
        </div>
        <span>{currentState}</span>
        <span>{hearingClearly}</span>
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
