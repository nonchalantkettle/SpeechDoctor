import React from 'react';

class LandingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
    };
  }

  handleClick() {
    this.setState({
      showText: true,
    });
  }
  render() {
    return (
      <h1>LandingView</h1>
    );
  }
}
