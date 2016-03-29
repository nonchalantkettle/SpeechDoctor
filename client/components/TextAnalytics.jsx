/* eslint no-param-reassign: 0*/
import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import _ from 'underscore';
import { getDefs,
         getSyns,
         analyzeText,
         checkWordsToAvoid,
         getTextStats,
         getAutomatedReadabilityIndex }
         from '../../server/utils/customTextAnalytics.js';

function renderTopThree(string) {
  const analyticsObj = analyzeText(string);
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
  const avoidedWordsUsed = checkWordsToAvoid(prop.wordsToAvoid, prop.text);

  const askToSave = !prop.userLoggedIn ?
    <p><Link to="signup">Sign up </Link>or <Link to="login">log in </Link>to save your results</p>
    : <div></div>;
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

          $('#topThreeMostUsed').append(`<p id="bold-word">${word[0]}${word[1]}</p>
            <p>Part of Speech: ${defintionAndPos.pos}</p>
            <p>Definition: ${defintionAndPos.def}</p>`);

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
        {askToSave}
        <div className="left-results">
          <h3>General Text Stats</h3>
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

        <div className="avoid-words">
          <h3>Words You Wanted To Avoid:</h3>
          {_.map(avoidedWordsUsed, (frequency, word) =>
            <p>{word}: <span id="bold-word">{frequency}</span></p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>Enter some text to analyze</div>
  );
}
