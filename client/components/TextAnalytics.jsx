import React from 'react';
import $ from 'jquery';
import { getDefs, getSyns, analyzeText } from '../../server/utils/customTextAnalytics.js';

function renderAnalytics(string) {
  const analyticsObj = analyzeText(string);
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

export default function TextAnalytics(prop) {
  if (prop.text) {
    renderAnalytics(prop.text).map((word) =>
      getDefs(word[0], (defErr, defData) => {
        if (defErr) {
          return defErr;
        }
        const defintionAndPos = defData;
        return getSyns(word[0], (synErr, synData) => {
          if (synErr) {
            return synErr;
          }
          const synonyms = synData.syns;
          $('#topThreeMostUsed').append(`<div id=${word[0]}>${word}
            <div id="partOfSpeech">Part of Speech: ${defintionAndPos.pos}</div>
            <div id="definition">Definition: ${defintionAndPos.def}</div>
          </div>`);
          synonyms.map((syn) => $('#topThreeMostUsed').append(`<li>${syn.word}</li>`));
          return $('#topThreeMostUsed').append('<hr />');
        });
      })
    );
    return (
      <div>
        <p>Here are your results:</p>
        <p id="topThreeMostUsed">Top Three Most Used Words: </p>
      </div>
    );
  }
  return (
    <div>Enter some text to analyze</div>
  );
}
