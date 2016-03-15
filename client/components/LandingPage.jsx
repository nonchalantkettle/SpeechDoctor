import React from 'react';
import { Link } from 'react-router';

import LandingButton from './LandingButton.jsx'

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
        <h1>Landing Page!</h1>
        <LandingButton
          handleLandingBtnClick={this.props.handleLandingBtnClick}
          directTo={'text'}
          buttonName={'Click to analyze text'}
        />
        <LandingButton
          handleLandingBtnClick={this.props.handleLandingBtnClick}
          directTo={'speech'}
          buttonName={'Click to analyze speech'}
        />
      </div>
    );
  }
}
