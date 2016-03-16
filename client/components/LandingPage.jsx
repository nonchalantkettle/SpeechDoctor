import React from 'react';
import { Link } from 'react-router';

import LandingButton from './LandingButton.jsx';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
    };
  }

  render() {
    return (
      <div>
        <h1>SpeechDoctor</h1>
        <div id="landing-buttons">
          <div id="left-landing">
            <LandingButton
              handleLandingBtnClick={this.props.handleLandingBtnClick}
              directTo={'text'}
              buttonName={'Click to analyze text'}
            />
          </div>
          <div id="right-landing">
            <LandingButton
              handleLandingBtnClick={this.props.handleLandingBtnClick}
              directTo={'speech'}
              buttonName={'Click to analyze speech'}
            />
          </div>
        </div>
      </div>
    );
  }
}
