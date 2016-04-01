/* eslint no-param-reassign: 0*/

import React from 'react';
import ReactD3 from 'react-d3-components';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import WordCloud from '../WordCloud.jsx';
import { getTextStats,
         analyzeText,
         getAutomatedReadabilityIndex,
       } from '../../../server/utils/customTextAnalytics';


const noDataFound = (
  <p>
    No data found! Please submit your text and speech
    samples and come back for your diagnosis later.
  </p>
);

const bodyWidth = document.body.clientWidth;
const width = bodyWidth * 0.6;
const height = bodyWidth * 0.4;
const shorterHeight = bodyWidth * 0.315;

const renderData = (data) => {
  // aggregate text
  const combinedTextInputs =
    data.reduce((acc, curr) => {
      acc += `${curr} `;
      return acc;
    }, '');

  const overallAnalysis = analyzeText(combinedTextInputs);
  const overallTextStats = getTextStats(combinedTextInputs);
  const overallARI = getAutomatedReadabilityIndex(combinedTextInputs).score;

  // find top three most used words
  const topThreeArray = [];
  const topThree = overallAnalysis.topThree;
  for (const key in topThree) {
    if (topThree.hasOwnProperty(key)) {
      topThreeArray.push({ x: key, y: topThree[key] });
    }
  }

  // individual
  const individualTextAverages = [];
  data.map((textInput) => {
    const stats = getTextStats(textInput);
    individualTextAverages.push({
      wordLength: stats.charactersPerWord,
      sentenceLength: stats.wordsPerSentence,
      ARI: getAutomatedReadabilityIndex(textInput).score,
    });
    return individualTextAverages;
  });


  // Pie Chart
  const PieChart = ReactD3.PieChart;
  const pieChartData = {
    label: 'topThreeAllTime',
    values: topThreeArray,
  };
  const sort = null;

  // Bar Chart
  const BarChart = ReactD3.BarChart;
  let barChartData = [{
    label: 'allTimeAverages',
    values: [
      { x: 'A', y: overallTextStats.charactersPerWord },
      { x: 'B', y: overallTextStats.wordsPerSentence },
      { x: 'C', y: overallARI },
    ],
  }];
  if (bodyWidth >= 950) {
    console.log('body width is greather than 950');
    barChartData = [{
      label: 'allTimeAverages',
      values: [
        { x: 'Word Length', y: overallTextStats.charactersPerWord },
        { x: 'Sentence Length', y: overallTextStats.wordsPerSentence },
        { x: 'ARI', y: overallARI },
      ],
    }];
  }

  const barChartLabels = bodyWidth < 950 ?
    <div id="bar-chart-labels"><p>A - Word Length</p><p>B - Sentence Length</p><p>C - ARI</p></div> :
    <div></div>;

  // Line Graphs
  const lineWordLength = [];
  const lineSentenceLength = [];
  const lineARI = [];
  for (let i = 0; i < individualTextAverages.length; i++) {
    lineWordLength.push({
      x: i, y: individualTextAverages[i].wordLength,
    });
    lineSentenceLength.push({
      x: i, y: individualTextAverages[i].sentenceLength,
    });
    lineARI.push({
      x: i, y: individualTextAverages[i].ARI,
    });
  }
  const LineChart = ReactD3.LineChart;
  const lineChartData = [
    {
      label: 'charactersPerWord',
      values: lineWordLength,
    },
    {
      label: 'wordsPerSentence',
      values: lineSentenceLength,
    },
    {
      label: 'ARI',
      values: lineARI,
    },
  ];


  return (
    <div id="userAnalytics">
      <Row>
        <Col md={12}>
          <h1 id="text-input-title">Your Personal Analytics</h1>
        </Col>
      </Row>
      <Row>
        <Col md={1}/>
        <Col md={8}>
          <div id="piechart">
            <h2>All Time Most-Used Words</h2>
            <hr/>
            <PieChart
              data={pieChartData}
              width={width}
              height={shorterHeight}
              id="userChart"
              className="piechart"
              margin={ { top: 10, bottom: 10, left: 100, right: 100 } }
              sort={sort}
            />
          </div>
        </Col>
        <Col md={3}/>
      </Row>
      <Row>
        <Col md={2}/>
        <Col md={9}>
          <div id="barchart">
            <br/>
            <h2 id="bar-chart-labels">All Time Averages</h2>
            <hr/>
            <br/>
            {barChartLabels}
            <BarChart
              data={barChartData}
              width={width}
              height={height}
              id="userChart"
              className="barchart"
              margin={ { top: 10, bottom: 50, left: 50, right: 10 } }
            />
          </div>
        </Col>
        <Col md={4}>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
            <h2 id="statsOverTime">Stats Over Time</h2>
            <hr/>
            <h3 id="charsPerWordStat">Characters Per Word</h3>
            <h3 id="wordsPerSentenceStat">Words Per Sentence</h3>
            <h3 id="ARIStat">Average Readability Index</h3>
        </Col>
        <Col md={9}>
          <div id="linechart">
            <LineChart
              data={lineChartData}
              width={width}
              height={height}
              id="userChart"
              className="linechart"
              margin={ { top: 10, bottom: 50, left: 50, right: 10 } }
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <div id="cloud">
            <WordCloud text={combinedTextInputs} />
          </div>
        </Col>
        <Col md={7}>
          <h2>Your Personal Word Cloud</h2>
          <hr/>
        </Col>
      </Row>
    </div>
  );
};

export default function UserAnalytics(prop) {
  const data = prop.data;
  return (
    data.length ? renderData(data) : noDataFound
  );
}

UserAnalytics.propTypes = {
  data: React.PropTypes.array,
};
