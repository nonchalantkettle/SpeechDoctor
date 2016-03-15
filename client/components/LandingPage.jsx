import React from 'react';

export default class LandingPage extends React.Component {
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
      <h1>LANDING PAGE!</h1>
    );
  }
}
