import React from 'react';
import $ from 'jquery';

export default class WordsToAvoid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      wordsToAvoid: [],
    };
  }

  handleChange(e) {
    this.setState({
      word: e.target.value,
    });
  }

  addWord() {
    this.state.wordsToAvoid.push(this.state.word);
    $('.avoid').append(`<li>${this.state.word}</li>`);
    this.setState({
      word: '',
    });
  }

  render() {
    const avoidWord = this.addWord.bind(this);
    const handleInputChange = this.handleChange.bind(this);
    return (
      <div>
        <h3 className="avoid">Words to Avoid</h3>
        <form onSubmit={avoidWord}>
          <input
            id="avoidInput"
            className="inputForm"
            placeholder="Add words you want to avoid here"
            value={this.state.word}
            onChange={handleInputChange}
          />
          <button onSubmit={avoidWord}>Add Word</button>
        </form>
      </div>
    );
  }

}
