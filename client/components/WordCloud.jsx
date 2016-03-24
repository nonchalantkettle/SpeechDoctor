import React from 'react';
import d3 from 'd3';
import cloud from 'd3.layout.cloud';

export default function cloudMaker(prop) {
  const fill = d3.scale.category20();

  function draw(words) {
    d3.select('#cloud').append('svg')
      .attr('width', 300)
      .attr('height', 300)
    .append('g')
      .attr('transform', 'translate(150,150)')
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

  const layout = cloud()
    .size([300, 300])
    .words(prop.text.split(' ').map((d) => (
        { text: d, size: 10 + Math.random() * 50 }
      )))
    .padding(5)
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
        <div>End</div>
      </div>
    </div>
  );
}
