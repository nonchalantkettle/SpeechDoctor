import React from 'react';
import { countEachWord, topThreeWords, findCurrentLargest, checkWordstoAvoid, analyzeText } from '../../server/utils/customTextAnalytics.js'

export default class TextAnalytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dummyState: false,
    };
  }

  analyzeText = (string) => {
    let tempObject = countEachWord(string);
    let results = [];
    for (let key in tempObject) {
      results.push(tempObject[key]);
    }
    console.log(results);
    return results;
  }

  render() {
    let ourText = this.props.text;
    let topThree = this.countEachWordTest(this.props.text).map(function(word){ return <li>{word}</li>});
    return (
      <div>
        <p>Here are your results: {topThree}</p>
        <p>This should work: {ourText}</p>
        <p>This was working: {this.props.text}</p>
      </div>
    );
  }
}


/*

hey hey hey how how how are you you you

*/
