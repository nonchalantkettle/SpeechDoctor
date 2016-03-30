import React from 'react';
import $ from 'jquery';
import WordsToAvoid from '../WordsToAvoid.jsx';
import { Row, Col } from 'react-bootstrap';

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

  addWordsToAvoidList(word) {
    this.state.wordsToAvoid.push(word);
    this.setState({
      wordsToAvoid: this.state.wordsToAvoid,
    });
  }

  removeWordsFromAvoidList() {
    this.setState({
      wordsToAvoid: [],
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
      const wordsToAvoidMethods = {
      addWordsToAvoid: this.addWordsToAvoidList.bind(this),
      removeWordsFromAvoid: this.removeWordsFromAvoidList.bind(this),
    };

    return (
      <div>
        <Row>
          <Col md={12}>
            <textarea
              className="inputForm"
              placeholder="The doctor will see you now! Type or paste in your text sample here."
              type="text"
              onChange={handleInputChange}
              value={this.state.inputValue}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div>
              <button onClick={handleClick}>Analyze</button>
              <button onClick={clearTextForm}>Reset</button>
              <button onClick={saveText}>Save Text</button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

InputForm.propTypes = {
  analyzeText: React.PropTypes.func,
  resetText: React.PropTypes.func,
  user: React.PropTypes.string,
};
