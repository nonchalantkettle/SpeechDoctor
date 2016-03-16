import React from 'react';
import InputForm from './InputForm.jsx';
import TextAnalytics from './TextAnalytics.jsx';

export default class TextView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleAnalytics: false,
      value: '',
    };
  }

  analyzeText = () => {
    this.setState({
      visibleAnalytics: true,
    });
  }

  resetText = () => {
    this.setState({
      visibleAnalytics: false,
      value: '',
    });
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    let analytics = this.state.visibleAnalytics ? <TextAnalytics text={this.state.value}/> : '';
    return (
      <div>
        <div id='text-input'>
          <h1 id='text-input-title'>Text Analyzer</h1>
          <br/>
          <InputForm text={this.state.value} onChange={this.onChange}/>
            <button onClick={this.analyzeText}>Analyze</button>
            <button onClick={this.resetText}>Reset</button>
            <div>{analytics}</div>
        </div>
      </div>
    );
  }
}
