import React from 'react';

export default class TextView extends React.Component {

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
      <h1>TEST View!</h1>
    );
  }
}
