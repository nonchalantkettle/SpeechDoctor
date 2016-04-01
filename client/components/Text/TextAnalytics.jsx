/* eslint no-param-reassign: 0*/

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import _ from 'underscore';
import { Row, Col } from 'react-bootstrap';
import WordCloud from '../WordCloud.jsx';
import api from '../../utils/api';
import { analyzeText,
         checkWordsToAvoid,
         getTextStats,
         getAutomatedReadabilityIndex,
       } from '../../../server/utils/customTextAnalytics.js';

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
    <p><Link id="lightBackgroundLink" to="signup">Sign up </Link>
      or <Link to="login" id="lightBackgroundLink">log in </Link>to save your results</p>
    : <div></div>;
  if (prop.text) {
    const counts = getTextStats(prop.text);
    const ARI = getAutomatedReadabilityIndex(prop.text);
    renderTopThree(prop.text).map((word) =>
      api.getDefs(word[0], (defErr, defData) => {
        if (defErr) {
          console.log(" There was an error with your request ")
          return;
        }
        return api.getSyns(word[0], (synErr, synData) => {
          if (synErr) {
            console.log(" There was an error with your request ")
            return;
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
        <Row>
          <Col md={12}>
            <h2>Results</h2>
            {askToSave}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div>
              <h3 id="topThreeMostUsed">Most-Used Words</h3>
            </div>
            <div className="avoid-words">
              <h3>Words You Wanted To Avoid:</h3>
              {_.map(avoidedWordsUsed, (frequency, word) =>
                <p>{word}: <span id="bold-word">{frequency}</span></p>
              )}
            </div>
          </Col>
          <Col md={6}>
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
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <WordCloud text={prop.text} />
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div>Enter some text to analyze</div>
  );
}
