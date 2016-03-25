import React from 'react';
import $ from 'jquery';
import InputForm from './InputForm.jsx';
import TextAnalytics from './TextAnalytics.jsx';
import WordCloud from './WordCloud.jsx';
import Timer from './Timer.jsx';

let WPM = 0;

export default class TextView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleAnalytics: false,
      value: '',
      secondsElapsed: 0,
    };
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  getSeconds() {
    return Math.floor(this.state.secondsElapsed % 60);
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

  startTimer() {
    this.incrementer = setInterval(() => {
      this.setState({
        secondsElapsed: (this.state.secondsElapsed + 1),
      });
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
    });
  }

  calculateWPM() {
    const numberOfWords = this.state.results.split(' ').length;
    const time = this.state.secondsElapsed;
    const wordsPerSecond = (numberOfWords / time);
    WPM = Math.floor(wordsPerSecond * 60);
  }


  render() {
    const removeWordCloud = () => {
      if (document.getElementById('word-cloud')) {
        $('#text-input').find('#word-cloud').remove();
      }
    };

    const analytics = this.state.visibleAnalytics ?
      <div>
        You write at {WPM} words per minute.
        <TextAnalytics text={this.state.value} />
        <WordCloud text={this.state.value} />
      </div>
      : removeWordCloud();

    const inputFormMethods = {
      analyzeText: this.analyzeText.bind(this),
      resetText: this.resetText.bind(this),
    };

    const timerMethods = {
      getSeconds: this.getSeconds.bind(this),
      getMinutes: this.getMinutes.bind(this),
      secondsElapsed: this.state.secondsElapsed,
    };

    return (
      <div>
        <div id="text-input">
          <h1 id="text-input-title">Text Analyzer</h1>
          <InputForm {...inputFormMethods} />
          <Timer {...timerMethods} />
          {analytics}
        </div>
      </div>
    );
  }
}
