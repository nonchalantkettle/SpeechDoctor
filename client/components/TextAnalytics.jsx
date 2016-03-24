/* eslint no-param-reassign: 0*/
import React from 'react';
import $ from 'jquery';
import { getDefs,
         getSyns,
         analyzeText,
         getTextStats,
         getAutomatedReadabilityIndex }
         from '../../server/utils/customTextAnalytics.js';

function renderTopThree(string) {
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
    const counts = getTextStats(prop.text);
    const ARI = getAutomatedReadabilityIndex(prop.text);
    renderTopThree(prop.text).map((word) =>
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

          $('#topThreeMostUsed').append(`<div id=${word[0]}><p>${word[0]}${word[1]}</p>
            <p id="partOfSpeech">Part of Speech: ${defintionAndPos.pos}</div>
            <p id="definition">Definition: ${defintionAndPos.def}</div>
          </div>`);

          if (synonyms.length) {
            let synString = synonyms.reduce((acc, syn) => {
              acc += `${syn.word}, `;
              return acc;
            }, '');
            synString = synString.slice(0, -2);
            $('#topThreeMostUsed').append(`<p>Synonyms: ${synString}</p>`);
          }

          return synonyms;
        });
      })
    );
    return (
      <div>
        <h2>Results</h2>
        <h3>General Text Stats</h3>
        <div>
          <p>Total Characters (all): {counts.charsWithSpace}</p>
          <p>Total Characters (no spaces): {counts.charsNoSpace}</p>
          <p>Total Characters (no punctuation or spaces): {counts.charsJustLetters}</p>
          <p>Total Words: {counts.words}</p>
          <p>Total Sentences: {counts.sentences}</p>
          <p>Total Paragraphs: {counts.paragraphs}</p>
          <p>Average Characters Per Word: {counts.charactersPerWord}</p>
          <p>Average Words Per Sentence: {counts.wordsPerSentence}</p>
          <p>Automated Readability Index: Target Age - {ARI.age} Target Grade {ARI.grade}</p>
        </div>
        <h3 id="topThreeMostUsed">Most-Used Words</h3>
      </div>
    );
  }
  return (
    <div>Enter some text to analyze</div>
  );
}
