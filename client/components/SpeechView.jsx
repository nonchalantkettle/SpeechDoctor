/* global webkitSpeechRecognition */
/* eslint new-cap: 0 */

import React from 'react';
import SpeechAnalytics from './SpeechAnalytics.jsx';
import Timer from './Timer.jsx';
import _ from 'underscore';
import promptGenerator from './../utils/randomPromptGenerator.js';
import $ from 'jquery';

const recognition = new webkitSpeechRecognition();
let WPM = 0;

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
      testMessage:
        `Before we get started, please read the following
        prompt to make sure we can hear you properly:`,
      secondsElapsed: 0,
      timerVisible: false,
      prompt: '',
    };
  }

  componentWillMount() {
    const prompt = promptGenerator.randomPromptGenerator();
    this.setState({
      prompt,
    });
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  getSeconds() {
    return Math.floor(this.state.secondsElapsed % 60);
  }

  getSpeakingPrompt() {
    const speakingPrompt = promptGenerator.speakingPromptGenerator();
    $('#recording-view').append(`<p>Prompt: ${speakingPrompt}</p>`);
  }

  showTimer() {
    this.setState({
      timerVisible: !this.state.timerVisible,
    });
  }

  handleClick() {
    if (this.state.secondsElapsed === 0 && !this.state.recording) {
      this.incrementer = setInterval(() => {
        this.setState({
          secondsElapsed: (this.state.secondsElapsed + 1),
        });
      }, 1000);
    } else if (this.state.secondsElapsed > 0 && this.state.recording) {
      clearInterval(this.incrementer);
    } else if (this.state.secondsElapsed > 0 && !this.state.recording) {
      clearInterval(this.incrementer);
      this.setState({
        secondsElapsed: 0,
      });
      this.incrementer = setInterval(() => {
        this.setState({
          secondsElapsed: (this.state.secondsElapsed + 1),
        });
      }, 1000);
    }

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

  calculateWPM() {
    const numberOfWords = this.state.results.split(' ').length;
    const time = this.state.secondsElapsed;
    const wordsPerSecond = (numberOfWords / time);
    WPM = Math.floor(wordsPerSecond * 60);
  }

  displayAnalytics() {
    this.setState({
      showAnalytics: !this.state.showAnalytics,
    });
  }

  listener() {
    if (this.state.recording) {
      this.calculateWPM();
      recognition.stop();
      return;
    }
    recognition.onresult = (event) => {
      let returnedTranscript = '';
      const threshold = 0.75;
      const promptLowerCase = this.state.prompt.toLowerCase();

      for (let i = 0; i < event.results.length; i++) {
        if (!this.state.passedTest) {
          if (_.isEqual(event.results[i][0].transcript.toLowerCase(), promptLowerCase)) {
            if (event.results[i][0].confidence > threshold) {
              returnedTranscript = '';
              clearInterval(this.incrementer);
              this.setState({
                passedTest: true,
                testMessage: 'Great! You speak clearly. The doctor will see you now.',
                recording: false,
                results: '',
                secondsElapsed: 0,
              });
              recognition.stop();
            } else {
              this.setState({
                testMessage: 'Sorry, the doctor is a bit hard of hearing. Please try again.',
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
      <div>
        You speak at {WPM} words per minute.
        <SpeechAnalytics speech={this.state.results} userLoggedIn={this.props.userLoggedIn} />
      </div> :
      <div></div>;

    const conversationalPrompt = this.state.passedTest ?
      <button onClick={this.getSpeakingPrompt}>Generate a Speaking Prompt</button> :
      <div></div>;

    const testPrompt = !this.state.passedTest ? <p>{this.state.prompt}</p> :
      <div></div>;

    const timerButton = this.showTimer.bind(this);

    const showTimerButton = this.state.passedTest ?
      <button className="timer-button" onClick={timerButton}>Show Timer</button> :
      <div></div>;

    const timerMethods = {
      getSeconds: this.getSeconds.bind(this),
      getMinutes: this.getMinutes.bind(this),
      secondsElapsed: this.state.secondsElapsed,
    };

    const visibleTimer = this.state.passedTest && this.state.timerVisible ?
      <Timer {...timerMethods} /> :
      <div></div>;

    return (
      <div>
        <div id="speech-input">
          <h1 id="speech-input-title">Speech Analyzer</h1>
          <h4>{this.state.testMessage}</h4>
          {testPrompt}
          <div id="recording-view">
            <button className="record-button" onClick={handleClick}>
              <img id="record-img" src="assets/record.png" alt="record" />
            </button>
          </div>
        </div>
        <div id="speechInteraction">
          <span>{currentState}</span>
          {conversationalPrompt}
          {transciptButtonBeforeTest}
          {showTimerButton}
          {visibleTimer}
        </div>
        <div>
          <div>{transcript}</div>
        </div>
        <div id="speechInteraction">
          {analyticsButton}
          {finishedSpeech}
        </div>
      </div>
    );
  }
}

SpeechView.propTypes = {
  userLoggedIn: React.PropTypes.bool,
};
