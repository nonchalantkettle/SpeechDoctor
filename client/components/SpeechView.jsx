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
      showAnalytics: false,
      passedTest: false,
      testMessage: 'Before we get started, we want to make sure we can hear you properly',
      secondsElapsed: 0,
    };
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  getSeconds() {
    return Math.floor('0' + this.state.secondsElapsed % 60).slice(-2);
  }

  handleClick() {
    let _this = this;

    this.incrementer = setInterval(()=>{
      _this.setState({
        secondsElapsed: (_this.state.secondsElapsed + 1)
      })
    },1000)
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

  displayAnalytics() {
    this.setState({
      showAnalytics: !this.state.showAnalytics,
    });
  }

  listener() {
    if (this.state.recording) {
      recognition.stop();
      return;
    }
    recognition.onresult = (event) => {
      let returnedTranscript = '';
      const threshold = 0.75;

      for (let i = 0; i < event.results.length; i++) {
        if (!this.state.passedTest) {
          if (event.results[i][0].transcript.split(' ').length === 10) {
            if (event.results[i][0].confidence > threshold) {
              returnedTranscript = '';
              this.setState({
                passedTest: true,
                testMessage: 'Great! You speak clearly. The doctor will see you now',
                recording: false,
                results: '',
              });
              recognition.stop();
            } else {
              this.setState({
                testMessage: 'Sorry, the doctor is a bit hard of hearing.',
                results: '',
              });
            }
          }
        }
        returnedTranscript += event.results[i][0].transcript;
      }

      this.setState({
        results: returnedTranscript,
      });
    };
    recognition.start();
  }

  render() {

    const currentState = this.state.recording ?
      <div>Recording...</div> :
      <div>Start recording now</div>;

    const handleClick = this.handleClick.bind(this);

    const displayTranscript = this.displayTranscript.bind(this);

    const showDisplayTranscriptButton = !this.state.showTranscript ?
      <button onClick={displayTranscript}>Display Transcript</button> :
      <button onClick={displayTranscript}>Hide Transcript</button>;

    const transciptButtonBeforeTest = this.state.passedTest ?
      showDisplayTranscriptButton : <div></div>;

    // Will probably have to modify this to get diplay transctipt to reset after test is passed.
    const transcript = this.state.showTranscript || (!this.state.passedTest) ?
      <div id="rendered-speech">Here is the transcript: {this.state.results}</div> :
      <div></div>;

    const analytics = this.displayAnalytics.bind(this);

    const analyticsButton = this.state.passedTest ?
      <button onClick={analytics}>Display Analytics</button> :
      <div></div>;


    const finishedSpeech = this.state.passedTest && !this.state.recording &&
      this.state.showAnalytics ?
      <SpeechAnalytics speech={this.state.results} /> :
      <div></div>;

    return (
      <div>
        <div id="speech-input">
          <h4>{this.state.testMessage}</h4>
          <div id="recording-view">
            <button className="record-button" onClick={handleClick}>
              <img id="record-img" src="assets/record.png" alt="record" />
            </button>
            <img id="record-img" src="assets/play.png" alt="play" />
            <img id="record-img" src="assets/pause.png" alt="pause" />
          </div>
        </div>
        <div>
          <h3 id="timer"><time>00:00:00</time></h3>
          <span>{currentState}</span>
          {transciptButtonBeforeTest}
        </div>
        <div>
          <div>{transcript}</div>
        </div>
        <div>
          {analyticsButton}
          {finishedSpeech}
        </div>
      </div>
    );
  }
}
