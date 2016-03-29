import React from 'react';
import ReactD3 from 'react-d3-components';

export default function UserVisualAnalytics() {
  const BarChart = ReactD3.BarChart;
  const barChartData = [{
    label: 'allTimeAverages',
    values: [
      { x: 'Word Length', y: 10 },
      { x: 'Sentence Length', y: 4 },
      { x: 'ARI', y: 3 },
    ],
  }];

  const PieChart = ReactD3.PieChart;
  const pieChartData = {
    label: 'topThreeAllTime',
    values: [
      { x: 'First Word', y: 10 },
      { x: 'Second Word', y: 4 },
      { x: 'Third Word', y: 3 },
    ],
  };
  const sort = null;

  const LineChart = ReactD3.LineChart;
  const lineChartData = [
    {
      label: 'charactersPerWord',
      values: [
        { x: 0, y: 2 },
        { x: 1.3, y: 5 },
        { x: 3, y: 6 },
        { x: 3.5, y: 6.5 },
        { x: 4, y: 6 },
        { x: 4.5, y: 6 },
        { x: 5, y: 7 },
        { x: 5.5, y: 8 },
      ],
    },
    {
      label: 'wordsPerSentence',
      values: [
        { x: 0, y: 3 },
        { x: 1.3, y: 4 },
        { x: 3, y: 7 },
        { x: 3.5, y: 8 },
        { x: 4, y: 7 },
        { x: 4.5, y: 7 },
        { x: 5, y: 7.8 },
        { x: 5.5, y: 9 },
      ],
    },
    {
      label: 'ARI',
      values: [
        { x: 0, y: 4 },
        { x: 1.3, y: 5 },
        { x: 3, y: 2 },
        { x: 3.5, y: 9 },
        { x: 4, y: 7 },
        { x: 4.5, y: 4 },
        { x: 5, y: 14 },
        { x: 5.5, y: 7 },
      ],
    },
  ];

  return (
    <div id="userAnalytics">
      <h1 id="text-input-title">Your Personal Analytics</h1>
      <div id="piechart">
        <h2>All Time Most-Used Words</h2>
        <PieChart
          data={pieChartData}
          width={600}
          height={400}
          margin={ { top: 10, bottom: 10, left: 100, right: 100 } }
          sort={sort}
        />
      </div>
      <div id="barchart">
        <h2>All Time Averages</h2>
        <BarChart
          data={barChartData}
          width={500}
          height={500}
          margin={ { top: 10, bottom: 50, left: 50, right: 10 } }
        />
      </div>
      <div id="linechart">
        <h2>Stats Over Time</h2>
        <h3 id="charsPerWordStat">Characters Per Word</h3>
        <h3 id="wordsPerSentenceStat">Words Per Sentence</h3>
        <h3 id="ARIStat">Average Readability Index</h3>
        <LineChart
          data={lineChartData}
          width={500}
          height={500}
          margin={ { top: 10, bottom: 50, left: 50, right: 10 } }
        />
      </div>
    </div>
  );
}
