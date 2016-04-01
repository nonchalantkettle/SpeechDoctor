/* global webkitSpeechRecognition */
/* eslint new-cap: 0 */

import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import { Row, Col } from 'react-bootstrap';
import SpeechAnalytics from './SpeechAnalytics.jsx';
import Timer from '../Timer.jsx';
import WordsToAvoid from '../WordsToAvoid.jsx';
import promptGenerator from '../../utils/randomPromptGenerator.js';

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
        prompt to make sure we can hear you properly.`,
      wordsToAvoid: [],
      secondsElapsed: 0,
      timerVisible: false,
      prompt: '',
      generatedSpeakingPrompt: '',
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
    this.setState({
      generatedSpeakingPrompt: speakingPrompt,
    });
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

  addWordsToAvoidList(word) {
    this.state.wordsToAvoid.push(word);
    this.setState({
      wordsToAvoid: this.state.wordsToAvoid,
    });
  }

  removeWordsFromAvoidList() {
    this.setState({
      wordsToAvoid: [],
    });
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
                testMessage: 'Great, you speak clearly! The doctor will see you now.',
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

  saveSpeech() {
    const request = {
      speechViewText: this.state.results,
      user: this.props.user,
    };
    $.ajax({
      url: '/speech',
      type: 'PUT',
      dataType: 'json',
      data: request,
      success: (data) => data,
      error: (err) => {
        throw new Error('Error: ', err);
      },
    });
  }

  render() {
    const recordingState = this.state.recording ?
      <div><br/><p>Recording...</p></div>:
      <div><br/><p>Start recording now</p></div>;

    const handleClick = this.handleClick.bind(this);

    const displayTranscript = this.displayTranscript.bind(this);

    const showDisplayTranscriptButton = !this.state.showTranscript ?
      <button onClick={displayTranscript}>Display Transcript</button> :
      <button onClick={displayTranscript}>Hide Transcript</button>;

    const transciptButtonBeforeTest = this.state.passedTest ?
      showDisplayTranscriptButton : <div></div>;

    // Will probably have to modify this to get diplay transctipt to reset after test is passed.
    const transcript = this.state.showTranscript || (!this.state.passedTest) ?
      <div><p id="rendered-speech">Your transcript: {this.state.results}</p></div> :
      <div></div>;

    const analytics = this.displayAnalytics.bind(this);

    const analyticsButton = this.state.passedTest ?
      <button onClick={analytics}>Display Analytics</button> :
      <div></div>;

    const finishedSpeech = this.state.passedTest && !this.state.recording &&
      this.state.showAnalytics ?
      <div>
        You speak at {WPM} words per minute.
        <SpeechAnalytics
          speech={this.state.results}
          wordsToAvoid={this.state.wordsToAvoid}
          userLoggedIn={this.props.userLoggedIn}
        />
      </div> :
      <div></div>;

    const getSpeakingPrompt = this.getSpeakingPrompt.bind(this);

    const generatedSpeakingPrompt = this.state.generatedSpeakingPrompt ?
      <p id="speakingPrompt">Prompt: <span id="bold-word">{this.state.generatedSpeakingPrompt}</span></p> :
      <div></div>

    const conversationalPrompt = this.state.passedTest ?
      <div>
        <br/>
        <p>Want to practice conversational speaking?</p>
        <button onClick={getSpeakingPrompt}>Generate a Speaking Prompt</button>
      </div> :
      <div></div>;

    const testPrompt = !this.state.passedTest ? <p id="bold-word">{this.state.prompt}</p> :
      <div></div>;

    const timerButton = this.showTimer.bind(this);

    const showTimerButton = this.state.passedTest ?
      <button className="timer-button" onClick={timerButton}>Show Timer</button> :
      <div></div>;

    const saveSpeechButton = this.saveSpeech.bind(this);

    const showSaveSpeechButton = (this.state.passedTest && !this.state.recording) ?
      <button className="save-speech-button" onClick={saveSpeechButton}>Save Speech</button> :
      <div></div>;

    const timerMethods = {
      getSeconds: this.getSeconds.bind(this),
      getMinutes: this.getMinutes.bind(this),
      secondsElapsed: this.state.secondsElapsed,
    };

    const wordsToAvoidMethods = {
      addWordsToAvoid: this.addWordsToAvoidList.bind(this),
      removeWordsFromAvoid: this.removeWordsFromAvoidList.bind(this),
    };

    const visibleTimer = this.state.passedTest && this.state.timerVisible ?
      <Timer {...timerMethods} /> :
      <div></div>;

    const wordsToAvoid = this.state.passedTest ?
      <div className="words-to-avoid">
        <WordsToAvoid {...wordsToAvoidMethods} />
      </div> :
      <div></div>;

    return (
      <div>
        <div id="speech-input">
          <Row>
            <Col md={12}>
              <h1 id="speech-input-title">Speech Analyzer</h1>
            </Col>
           </Row>
           <Row>
            <Col md={12}>
              <p>Get personalized analytics on your speaking by recording yourself below.</p>
              <hr/>
              <h4>{this.state.testMessage}</h4>
              <p id="recording-instructions">
                Click the microphone once to record, then click it again to stop recording.
              </p>
              {testPrompt}
              {generatedSpeakingPrompt}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div id="recording-view">
                <button className="record-button" onClick={handleClick}>
                  <img id="record-img" src="assets/recordwhite.png" alt="record" />
                </button>
                <div>
                  {recordingState}
                  <br/>
                  {transcript}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md={6}>
            <div id="speechInteraction">
              {transciptButtonBeforeTest}
              {showTimerButton}
              {conversationalPrompt}
              {visibleTimer}
            </div>
          </Col>
          <Col md={6}>
            {wordsToAvoid}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div id="speechInteraction">
              {analyticsButton}
              {finishedSpeech}
              {showSaveSpeechButton}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

SpeechView.propTypes = {
  user: React.PropTypes.string,
  userLoggedIn: React.PropTypes.bool,
};
