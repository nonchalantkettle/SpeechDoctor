import React from 'react';
// import { getTextStats, analyzeText } from '../../server/utils/customTextAnalytics';

export default class UserAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyState: false,
    };
  }

  handleClick() {
    this.setState({
      dummyState: true,
    });
  }

  /*
    combinedText = 'bigass string'
    topThree = [ { word1: 1 }, { word2: 2 }, { word3: 3} ]
    averageWordLengthArray = [ { x: 0, y: avg }, { x: 1, y: avg } ]


  */


  // renderTopThree(array) {
  //   array.reduce((acc, curr) {
  //     return acc.concat(curr);
  //   }, '')

  //   const analyticsObj = analyzeText(array.split(','));
  //   const topThreeWordsResult = analyticsObj.topThree;
  //   console.log('TOP THREE WORDS', topThreeWordsResult);
    // const results = [];
    // for (const key in topThreeWordsResult) {
    //   if (topThreeWordsResult.hasOwnProperty(key)) {
    //     results.push({ key: topThreeWordsResult[key]} );
    //   }
    // }
    // return results;

  // }


  render() {
    return (
      <div>
        {this.props.textData.map((data) =>
          <div>{data}</div>
        )}
      </div>
    );
  }
}

UserAnalytics.propTypes = {
  // speechData: React.PropTypes.string,
  textData: React.PropTypes.array,
};
