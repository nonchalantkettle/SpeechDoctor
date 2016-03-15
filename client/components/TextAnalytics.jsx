import React from 'react';

export default class TextAnalytics extends React.Component {

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
        {this.props.text}
      </div>
    );
  }
}
