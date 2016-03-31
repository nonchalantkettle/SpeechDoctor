import React from 'react';
import $ from 'jquery';

import InputForm from './InputForm.jsx';
import TextAnalytics from './TextAnalytics.jsx';
import Timer from '../Timer.jsx';
import WordsToAvoid from '../WordsToAvoid.jsx';
import promptGenerator from '../../utils/randomPromptGenerator';
import { Row, Col } from 'react-bootstrap';

export default class TextView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAnalytics: false,
      value: '',
      wordsToAvoid: [],
      secondsElapsed: 0,
      timer: false,
      writingPrompt: false,
    };
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  getSeconds() {
    return Math.floor(this.state.secondsElapsed % 60);
  }

  getWritingPrompt() {
    const writingPrompt = promptGenerator.writingPromptGenerator();
    if ($('#writingPrompt').length) {
      $('#writingPrompt').remove();
    }
    $('h1').append(`<p id="writingPrompt">Prompt: ${writingPrompt}</p>`);
  }

  resetText() {
    this.setState({
      visibleAnalytics: false,
      value: '',
    });
  }

  analyzeText(input) {
    this.setState({
      visibleAnalytics: !this.state.visibleAnalytics,
      value: input,
    });
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

  startTimer() {
    if (!this.state.timer) {
      this.setState({
        secondsElapsed: 0,
      });
    }
    this.incrementer = setInterval(() => {
      this.setState({
        secondsElapsed: (this.state.secondsElapsed + 1),
        timer: true,
      });
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.incrementer);
    if (!this.state.timer) {
      this.setState({
        secondsElapsed: 0,
      });
    }
    this.setState({
      timer: false,
    });
  }

  render() {
    const removeWordCloud = () => {
      if (document.getElementById('word-cloud')) {
        $('#analytics-container').find('#word-cloud').remove();
      }
    };

    const analytics = this.state.visibleAnalytics ?
      <div>
        <TextAnalytics
          text={this.state.value}
          wordsToAvoid={this.state.wordsToAvoid}
          userLoggedIn={this.props.userLoggedIn}
        />
      </div>
      : removeWordCloud();

    const inputFormProps = {
      analyzeText: this.analyzeText.bind(this),
      resetText: this.resetText.bind(this),
      user: this.props.user,
    };

    const timerMethods = {
      getSeconds: this.getSeconds.bind(this),
      getMinutes: this.getMinutes.bind(this),
      secondsElapsed: this.state.secondsElapsed,
    };

    const wordsToAvoidMethods = {
      addWordsToAvoid: this.addWordsToAvoidList.bind(this),
      removeWordsFromAvoid: this.removeWordsFromAvoidList.bind(this),
    };

    const start = this.startTimer.bind(this);

    const stop = this.stopTimer.bind(this);

    const timerButton = !this.state.timer ?
      <button onClick={start}>Start Timer</button> :
      <button onClick={stop}>Stop Timer</button>;

    const secondsLessThan10 = (timerMethods.getSeconds() < 10) ?
      <h3 id="timer">{timerMethods.getMinutes()}:0{timerMethods.getSeconds()}</h3> :
      <h3 id="timer">{timerMethods.getMinutes()}:{timerMethods.getSeconds()}</h3>;

    return (
      <div>
        <div id="analytics-container">
          <Row>
            <Col md={12}>
              <h1 id="text-input-title">Text Analyzer</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h4>Get personalized analytics on your written work by pasting or typing below.</h4>
              <br/>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <InputForm {...inputFormProps} />
            </Col>
            <Col md={4}>
              <div className="words-to-avoid"><WordsToAvoid {...wordsToAvoidMethods} /></div>
              <br />
              <button onClick={this.getWritingPrompt}>Generate a Writing Prompt</button>
              <br />
              <br />
              <div id="timerAlign">{timerButton}{secondsLessThan10}</div>
            </Col>
          </Row>
          {analytics}
        </div>
      </div>
    );
  }
}

TextView.propTypes = {
  userLoggedIn: React.PropTypes.bool,
  user: React.PropTypes.string,
};
