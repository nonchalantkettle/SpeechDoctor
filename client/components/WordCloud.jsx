import React from 'react';
import d3 from 'd3';
import cloud from 'd3.layout.cloud';
import { countEachWord } from '../../server/utils/customTextAnalytics.js';

export default function cloudMaker(prop) {
  const wordsToIgnore = /\b[a-z]{1,2}\b|the\b|and\b|that\b|are\b/gi;
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

  const numberOfWordsInCloud =
    wordArrayWithFrequency[0][1] >= 3 ? 5 * wordArrayWithFrequency[0][1] : 0;

  const fill = d3.scale.category10();
  let layout;

  function draw(words) {
    d3.select('#text-input').append('svg')
      .attr('id', 'word-cloud')
      .attr('width', 300)
      .attr('height', 300)
    .append('g')
      .attr('transform', `translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`)
    .selectAll('text')
      .data(words)
    .enter().append('text')
      .style('font-size', (d) => `${d.size} px`)
      .style('font-family', 'Impact')
      .style('fill', (d, i) => fill(i))
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
    .text((d) => d.text);
  }

  layout = cloud()
    .size([300, 300])
    .words(wordArrayNoFrequency.splice(0, numberOfWordsInCloud).map((d) => (
        { text: d, size: 10 + Math.random() * 15 }
      )))
    .rotate(() => ~~(Math.random() * 2) * 90)
    .font('Impact')
    .fontSize((d) => d.size)
    .on('end', draw);

  layout.start();

  return (
    <div>
      <div>
        <div>Word Cloud:</div>
        <div id="cloud">{cloudMaker}</div>
      </div>
    </div>
  );
}
