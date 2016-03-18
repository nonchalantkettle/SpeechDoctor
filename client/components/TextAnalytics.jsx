import React from 'react';
import { getSyns, analyzeText } from '../../server/utils/customTextAnalytics.js'
import _ from 'underscore';

export default class TextAnalytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dummyState: false,
    };
  }

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

  render() {
    let topThree = this.renderAnalytics(this.props.text).map(function(word){
      return <li onClick={() => getSyns(word[0])}>{word}</li>
    });
    return (
      <div>
        <p>Here are your results:</p>
        <p>Top Three Most Used Words: {topThree}</p>
      </div>
    );
  }
}
