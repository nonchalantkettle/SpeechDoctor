import React from 'react';
import { getDefsAndSyns, analyzeText } from '../../server/utils/customTextAnalytics.js';

export default class TextAnalytics extends React.Component {
  renderAnalytics = (string) => {
    const analyticsObj = analyzeText(string);
    let countEachWordResult = analyticsObj.allTotals;
    let topThreeWordsResult = analyticsObj.topThree;
    let results = [];
    for (let key in topThreeWordsResult) {
      results.push([key, ": " + topThreeWordsResult[key] + " times"]);
    }
    return results;
  }

  getWordInfo = (word) => {
    return getDefsAndSyns(word);
  }

  render() {
    // hold reference of 'this'
    const temp = this;

    let topThree = this.renderAnalytics(this.props.text).map((word) => {
      return (
        <div id={word[0]}>{word}
        {
          temp.getWordInfo(word[0]).map((syn) => {
            return (
              <li>{syn.word}</li>
            )
          })
        }
        </div>
      )
    });

    return (
      <div>
        <p>Here are your results:</p>
        <p>Top Three Most Used Words: </p>
        {topThree}
      </div>
    );
  }
}
