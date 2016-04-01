import React from 'react';
import d3 from 'd3';
import cloud from 'd3.layout.cloud';
import { countEachWord, getTextStats } from '../../server/utils/customTextAnalytics.js';
const bodyWidth = document.body.clientWidth;

export default function WordCloud(prop) {
  const numWords = getTextStats(prop.text).words;
  const wordsToIgnore = /\b[a-z0-9]{1,2}\b|the\b|and\b|that\b|are\b|for\b|have/gi;
  const wordFrequencyObject = countEachWord(prop.text);
  const wordArrayWithFrequency = [];
  const wordArrayNoFrequency = [];

  for (const word in wordFrequencyObject) {
    if (wordFrequencyObject.hasOwnProperty(word) && !word.match(wordsToIgnore)) {
      wordArrayWithFrequency.push([word, wordFrequencyObject[word]]);
      wordArrayWithFrequency.sort((a, b) => b[1] - a[1]);
    }
  }

  for (let i = 0; i < wordArrayWithFrequency.length; i++) {
    wordArrayNoFrequency.push(wordArrayWithFrequency[i][0]);
  }

  const numberOfWordsInCloud = numWords / 30;

  const fill = d3.scale.category10();
  let layout;

  const cloudWidth = 1000 || bodyWidth;
  const cloudHeight = cloudWidth * (3 / 5);

  function draw(words) {
    d3.select('#analytics-container').append('svg')
      .attr('id', 'word-cloud')
      .attr('width', cloudWidth)
      .attr('height', cloudHeight)
    .append('g')
      .attr('transform', `translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`)
    .selectAll('text')
      .data(words)
    .enter().append('text')
      .style('font-size', (d) => `${d.size}px`)
      .style('font-family', (d) => d.font)
      .style('fill', (d, i) => fill(i))
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
    .text((d) => d.text);
  }

  layout = cloud()
    .size([cloudWidth, cloudHeight])
    .words(wordArrayWithFrequency.slice(0, 100).map((d) => (
        { text: d[0], size: d[1] * (200 / numberOfWordsInCloud) * (cloudWidth / cloudHeight) }
      )))
    .rotate(() => ~~(Math.random() * 2) * 90)
    .font('Arial')
    .fontSize((d) => d.size)
    .on('end', draw);

  layout.start();

  return (
    <div id="cloud">{WordCloud}</div>
  );
}
