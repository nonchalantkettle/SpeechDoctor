/* eslint no-param-reassign: 0*/

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import api from '../../utils/api';
import { analyzeText,
         getTextStats,
         getAutomatedReadabilityIndex,
       } from '../../../server/utils/customTextAnalytics.js';

function renderTopThree(speech) {
  const analyticsObj = analyzeText(speech);
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
    const counts = getTextStats(prop.speech);
    const ARI = getAutomatedReadabilityIndex(prop.speech);
    const askToSave = !prop.userLoggedIn ?
      <p><Link to="signup">Sign up </Link>or <Link to="login">log in </Link>to save your results</p>
      : <div></div>;
    renderTopThree(prop.speech).map((word) =>
      api.getDefs(word[0], (defErr, defData) => {
        if (defErr) {
          return defErr;
        }
        return api.getSyns(word[0], (synErr, synData) => {
          if (synErr) {
            return synErr;
          }
          const def = defData.def;
          const pos = defData.pos;
          const syns = synData.syns;

          $('#topThreeMostUsed').append(`<p id="bold-word">${word[0]}${word[1]}</p>
            <p>Part of Speech: ${pos}</p>
            <p>Definition: ${def}</p>
            <p>Synonyms: ${syns}</p>`);

          return syns;
        });
      })
    );
    return (
      <div>
        <h2>Results</h2>
        {askToSave}
        <h3>General Speech Stats</h3>
        <div>
          <p>Total Characters (all): <span id="bold-word">{counts.charsWithSpace}</span></p>
          <p>Total Characters (no spaces): <span id="bold-word">{counts.charsNoSpace}</span></p>
          <p>Total Characters (no punctuation or spaces):
            <span id="bold-word"> {counts.charsJustLetters}</span>
          </p>
          <p>Total Words: <span id="bold-word">{counts.words}</span></p>
          <p>Total Sentences: <span id="bold-word">{counts.sentences}</span></p>
          <p>Total Paragraphs: <span id="bold-word">{counts.paragraphs}</span></p>
          <p>Average Characters Per Word:
            <span id="bold-word"> {counts.charactersPerWord}</span>
          </p>
          <p>Average Words Per Sentence: <span id="bold-word">{counts.wordsPerSentence}</span></p>
          <p>Automated Readability Index, Minimum Target Age for Audience:
            <span id="bold-word"> {ARI.age}</span>
          </p>
          <p>Automated Readability Index, Minimum Audience Education Level:
            <span id="bold-word"> {ARI.grade}</span>
          </p>
        </div>
        <h3 id="topThreeMostUsed">Most-Used Words</h3>
      </div>
    );
  }
  return (
    <div>Record some speech to analyze</div>
  );
}
