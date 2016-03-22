import React from 'react';

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

  render() {
    const handleInputChange = this.handleInputChange.bind(this);
    const handleClick = this.handleClick.bind(this);

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
          <button onClick={this.props.resetText}>Reset</button>
        </div>
      </div>
    );
  }
}

InputForm.propTypes = {
  analyzeText: React.PropTypes.node,
  resetText: React.PropTypes.node,
};
