import React from 'react';

import LandingButton from './LandingButton.jsx';

export default function LandingPage(prop) {
  return (
    <div>
      <h1>SpeechDoctor</h1>
      <div id="landing-buttons">
        <div id="left-landing">
          <LandingButton
            directTo={'text'}
            buttonName={'Click to analyze text'}
          />
        </div>
        <div id="right-landing">
          <LandingButton
            directTo={'speech'}
            buttonName={'Click to analyze speech'}
          />
        </div>
      </div>
    </div>
  );
}
