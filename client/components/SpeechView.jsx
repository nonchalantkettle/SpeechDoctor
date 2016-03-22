import React from 'react';
import RecordingView from './RecordingView.jsx';

export default function SpeechView() {
  return (
    <div id="speech-input">
      <h1 id="speech-input-title">Speech Analyzer</h1>
      <RecordingView />
    </div>
  );
}
