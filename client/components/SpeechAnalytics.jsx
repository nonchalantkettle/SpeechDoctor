import React from 'react';
import { getDefsAndSyns, analyzeText } from '../../server/utils/customTextAnalytics.js';

function renderAnalytics(speech) {
  const analyticsObj = analyzeText(speech);
  // const countEachWordResult = analyticsObj.allTotals;
  const topThreeWordsResult = analyticsObj.topThree;
  const results = [];
  for (const key in topThreeWordsResult) {
    if (topThreeWordsResult.hasOwnProperty(key)) {
      results.push([key, `: ${topThreeWordsResult[key]} times`]);
    }
  }
  return results;
}

export default function SpeechAnalytics(prop) {
  if (prop.speech) {
    const topThree = renderAnalytics(prop.speech).map((word) =>
      <div id={word[0]}>{word}
        <div id="partOfSpeech">Part of Speech: {getDefsAndSyns(word[0]).pos}</div>
        <div id="definition">Definition: {getDefsAndSyns(word[0]).def}</div>
        { getDefsAndSyns(word[0]).syns.map((syn) => <li>{syn.word}</li>) }
      <hr />
      </div>
    );
    return (
      <div>
        <p>Here are your results:</p>
        <p>Top Three Most Used Words: </p>
        {topThree}
      </div>
    );
  }
}
