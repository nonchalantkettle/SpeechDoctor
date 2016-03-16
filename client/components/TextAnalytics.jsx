import React from 'react';
import { countEachWord, topThreeWords, findCurrentLargest, checkWordstoAvoid, analyzeText } from '../../server/utils/customTextAnalytics.js'

export default class TextAnalytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dummyState: false,
    };
  }

  renderAnalytics = (string) => {
    console.log("string: ", string);
    let countEachWordResult = countEachWord(string);
    console.log("countEachWordResult: ", countEachWordResult);
    let topThreeWordsResult = topThreeWords(countEachWordResult);
    console.log("topThreeWordsResult: ", topThreeWordsResult);
    let results = [];
    for (let key in topThreeWordsResult) {
      results.push([key, ": " + topThreeWordsResult[key] + " times"]);
    }
    console.log("results: ", results);
    return results;  
  }

  render() {
    let topThree = this.renderAnalytics(this.props.text).map(function(word){ return <li>{word}</li>});
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
