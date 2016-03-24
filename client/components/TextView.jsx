import React from 'react';
import InputForm from './InputForm.jsx';
import TextAnalytics from './TextAnalytics.jsx';
import WordCloud from './WordCloud.jsx';

export default class TextView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleAnalytics: false,
      value: '',
    };
  }

  analyzeText(input) {
    this.setState({
      visibleAnalytics: true,
      value: input,
    });
  }

  resetText() {
    this.setState({
      visibleAnalytics: false,
      value: '',
    });
  }

  render() {
    const analytics = this.state.visibleAnalytics ? <TextAnalytics text={this.state.value} /> : '';
    const cloud = <WordCloud />;
    const inputFormMethods = {
      analyzeText: this.analyzeText.bind(this),
      resetText: this.resetText.bind(this),
    };

    return (
      <div>
        <div id="text-input">
          <h1 id="text-input-title">Text Analyzer</h1>
          <InputForm {...inputFormMethods} />
          {analytics}
          {cloud}
        </div>
      </div>
    );
  }
}
