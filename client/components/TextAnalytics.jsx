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
    let countEachWordResult = countEachWord(string);
    let topThreeWordsResult = topThreeWords(countEachWordResult);
    let results = [];
    for (let key in topThreeWordsResult) {
      results.push([key, ": " + topThreeWordsResult[key] + " times"]);
    }
    return results;  
  }

  render() {
    let ourText = this.props.text;
    let topThree = this.analyzeText(this.props.text).map(function(word){ return <li>{word}</li>});
    return (
      <div>
        <p>Here are your results:</p>
        <div>Top three words: {topThree}</div>
      </div>
    );
  }
}


/*

hey hey hey how how how are you you you

*/
