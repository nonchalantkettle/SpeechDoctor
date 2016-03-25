import React from 'react';
import $ from 'jquery';
import InputForm from './InputForm.jsx';
import TextAnalytics from './TextAnalytics.jsx';
import WordCloud from './WordCloud.jsx';
import Timer from './Timer.jsx';

export default class TextView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleAnalytics: false,
      value: '',
      secondsElapsed: 0,
      timer: false,
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

  // calculateWPM() {
  //   const numberChars = this.state.value.split('').length;
  //   console.log("this.state.value : ", this.state.value);
  //   const fiveCharsPerWord = (numberChars / 5);
  //   console.log("fiveCharsPerWord :", fiveCharsPerWord);
  //   const time = this.state.secondsElapsed;
  //   const wordsPerSecond = (fiveCharsPerWord / time);
  //   WPM = Math.floor(wordsPerSecond * 60);
  // }

  render() {
    const removeWordCloud = () => {
      if (document.getElementById('word-cloud')) {
        $('#text-input').find('#word-cloud').remove();
      }
    };

    // const typedWPM = this.state.visibleAnalytics && !this.state.timer ?
    //   <div>You type at {WPM} words per minute </div> :
    //   <div></div>;


    const analytics = this.state.visibleAnalytics ?
      <div>
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

    const start = this.startTimer.bind(this);

    const stop = this.stopTimer.bind(this);

    const timerButton = !this.state.timer ?
      <button onClick={start}>Start Timer</button> :
      <button onClick={stop}>Stop Timer</button>;

    return (
      <div>
        <div id="text-input">
          <h1 id="text-input-title">Text Analyzer</h1>
          <InputForm {...inputFormMethods} />
          <div>{timerButton}</div>
          <Timer {...timerMethods} />
          {analytics}
        </div>
      </div>
    );
  }
}
