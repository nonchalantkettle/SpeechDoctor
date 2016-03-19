import React from 'react';

export default class InputForm extends React.Component {
  render() {
    return (
      <div>
        <textarea
          className="inputForm"
          placeholder="The doctor will see you now!  Type or paste in your text sample here."
          type="text"
          rows="30"
          cols="150"
          onChange={this.props.onChange}
          value={this.props.text}>
        </textarea>
      </div>
    );
  }
}
