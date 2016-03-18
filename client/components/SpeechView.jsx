import React from 'react';
import RecordingView from './RecordingView.jsx';
import SpeechAnalytics from './SpeechAnalytics.jsx';

export default class SpeechView extends React.Component {

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

  handleChange = (e) => {
    this.state.value = e.target.value;
  }

  render() {
    return (

      <div>
        <div id='speech-input'>
          <h1 id='speech-input-title'>Speech Analyzer</h1>
            <RecordingView />
        </div>
      </div>
    );
  }
}