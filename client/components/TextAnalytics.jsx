import React from 'react';
import analytics from '../../server/utils/customTextAnalytics.js'

export default class TextAnalytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dummyState: false,
    };
  }


  render() {
    return (
      <div>
        <p>Here are your results!</p>
        {this.props.text}
      </div>
    );
  }
}
