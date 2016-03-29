import React from 'react';
import $ from 'jquery';

export default class WordsToAvoid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
    };
  }

  handleChange(e) {
    this.setState({
      word: e.target.value,
    });
  }

  addWord() {
    this.props.addWordsToAvoid(this.state.word);
    $('.avoid').append(`<div id='${this.state.word}'>${this.state.word}</div>`);
    this.setState({
      word: '',
    });
  }

  handleClick() {
    this.props.removeWordsFromAvoid();
    $('.avoid').children().remove();
  }

  render() {
    const addWord = this.addWord.bind(this);
    const handleClear = this.handleClick.bind(this);
    const handleInputChange = this.handleChange.bind(this);

    return (
      <div>
        <h3 className="avoid">Words to Avoid</h3>
        <form onSubmit={addWord}>
          <input
            id="avoidInput"
            className="inputForm"
            placeholder="Add words you want to avoid here"
            value={this.state.word}
            onChange={handleInputChange}
          />
          <button onSubmit={addWord}>Add Word</button>
          <button onClick={handleClear}>Clear Words</button>
        </form>
      </div>
    );
  }
}

WordsToAvoid.propTypes = {
  addWordsToAvoid: React.PropTypes.func,
  removeWordsFromAvoid: React.PropTypes.func,
};
