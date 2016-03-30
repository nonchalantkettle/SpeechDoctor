import React from 'react';
import $ from 'jquery';

import InputForm from './InputForm.jsx';
import TextAnalytics from './TextAnalytics.jsx';
import WordCloud from '../WordCloud.jsx';
import Timer from '../Timer.jsx';
import WordsToAvoid from '../WordsToAvoid.jsx';
import promptGenerator from '../../utils/randomPromptGenerator';

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
        <WordCloud text={this.state.value} />
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

    return (
      <div>
        <div id="analytics-container">
          <h1 id="text-input-title">Text Analyzer</h1>
          <InputForm {...inputFormProps} />
          <button onClick={this.getWritingPrompt}>Generate a Writing Prompt</button>
          <div>{timerButton}</div>
          <Timer {...timerMethods} />
          <div className="words-to-avoid"><WordsToAvoid {...wordsToAvoidMethods} /></div>
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
