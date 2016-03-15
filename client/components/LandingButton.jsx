import React from 'react';

export default class LandingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
    };
  }

  render() {
    return (
      <button onClick={this.props.handleLandingBtnClick}>LandingButton</button>
    );
  }
}
