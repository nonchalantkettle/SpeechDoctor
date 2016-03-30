import React from 'react';
import $ from 'jquery';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleClick() {
    this.props.analyzeText(this.state.inputValue);
  }

  clearTextForm() {
    this.setState({
      inputValue: '',
    });
    this.props.resetText();
  }

  saveText() {
    const request = {
      textViewText: this.state.inputValue,
      user: this.props.user,
    };
    $.ajax({
      url: '/text',
      type: 'PUT',
      dataType: 'json',
      data: request,
      success: (data) => data,
      error: (err) => {
        throw new Error('Error: ', err);
      },
    });
  }

  render() {
    const handleInputChange = this.handleInputChange.bind(this);
    const handleClick = this.handleClick.bind(this);
    const clearTextForm = this.clearTextForm.bind(this);
    const saveText = this.saveText.bind(this);

    return (
      <div>
        <textarea
          className="inputForm"
          placeholder="The doctor will see you now! Type or paste in your text sample here."
          type="text"
          rows="30"
          cols="150"
          onChange={handleInputChange}
          value={this.state.inputValue}
        />
        <div>
          <button onClick={handleClick}>Analyze</button>
          <button onClick={clearTextForm}>Reset</button>
          <button onClick={saveText}>Save Text</button>
        </div>
      </div>
    );
  }
}

InputForm.propTypes = {
  analyzeText: React.PropTypes.func,
  resetText: React.PropTypes.func,
  user: React.PropTypes.string,
};