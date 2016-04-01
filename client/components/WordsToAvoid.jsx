import React from 'react';
import $ from 'jquery';
import { Row, Col } from 'react-bootstrap';

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
    $('.avoid').append(`<p id='${this.state.word}'>${this.state.word}</p>`);
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
        <Row>
          <Col md={12}>
            <h3 className="avoid">Words to Avoid</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <form onSubmit={addWord}>
              <input
                id="avoid-input"
                className="inputForm"
                placeholder="Add words you want to avoid here"
                value={this.state.word}
                onChange={handleInputChange}
              />
              <br />
              <button onSubmit={addWord}>Add Word</button>
              <button onClick={handleClear}>Clear Words</button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

WordsToAvoid.propTypes = {
  addWordsToAvoid: React.PropTypes.func,
  removeWordsFromAvoid: React.PropTypes.func,
};
