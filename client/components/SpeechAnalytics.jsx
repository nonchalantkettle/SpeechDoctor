import React from 'react';

export default class SpeechAnalytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dummyState: false,
    };
  }

  handleClick() {
    this.setState({
      dummyState: true,
    });
  }

  render() {
    return (
      <div>
        Speech analytics go here!
      </div>
    );
  }
}

