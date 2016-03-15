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
    });
  }

  onChange = (e) => {
    this.state.value = e.target.value;
  }

  render() {
    let analytics = this.state.visibleAnalytics ? <TextAnalytics text={this.state.value}/> : "";
    let enteredText = this.state.value;
    return (
      <div>
        <h1>Text Analyzer</h1>
         <InputForm value={this.state.value} onChange={this.onChange}/>
           <button onClick={this.analyzeText}>Analyze</button>
           <button onClick={this.resetText}>Reset</button>
           <div>{this.state.value}</div>
      </div>
    );
  }
}
