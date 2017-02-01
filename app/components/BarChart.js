import * as d3 from 'd3';

export default function BarChart (props) {
  let ls = document.getElementById('bar-chart');

  if (ls) {
    ls.parentNode.removeChild(ls);
  }
  const data = props.data.map((d) => {
    return {
      date: new Date(d.date),
      rate: d.rates[Object.keys(d.rates)[0]] || 1
    };
  });

  const median = d3.median(data, function (d) { return d.rate; });
  const deviation = d3.deviation(data, function (d) { return d.rate; });

  const width = 900;
  const height = 420;

  const margin = 80;
  const colMargin = 2;

  let x = d3
  .scaleTime()
  .domain(d3.extent(data.map(d => d.date)))
  .range([0, width]);

  let y = d3
    .scaleLinear()
    .domain(d3.extent(data.map(d => d.rate)))
    .range([10, height - (margin * 2)]);

  let xAxis = d3
    .axisBottom(x)
    .ticks(d3.timeDay, 1)
    .tickFormat(d3.timeFormat('%b %d'));

  let xLinear = d3.scaleBand()
    .domain(d3.range(0, data.length))
    .range([0, width]);

  const chart = d3.select(props.el)
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('id', 'bar-chart');

  let bar = chart
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar');
  bar
    .append('rect')
    .attr('fill', 'steelblue')
    .attr('width', xLinear.bandwidth() - colMargin)
    .attr('x', function (d, i) { return i * xLinear.bandwidth() - colMargin; })
    .attr('height', 1)
    .attr('y', height - margin)
    .transition()
    .duration(500)
    .attr('height', function (d) { return y(d.rate); })
    .attr('y', function (d) { return height - margin - y(d.rate); });

  bar.exit().remove();

  bar
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', '#000')
    .text(function (d) {
      const rate = d.rate > 100 ? Math.round(d.rate) : (d.rate > 10 ? d.rate.toFixed(1) : d.rate.toFixed(2));
      return rate;
    })
    .attr('x', function (d, i) { return i * xLinear.bandwidth() + 20; })
    .attr('y', height - margin)
    .transition()
    .duration(500)
    .attr('y', function (d) { return height - margin - (y(d.rate) + 4); });

  bar.exit().remove();

  chart.append('line')
    .attr('class', 'median')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', 0)
    .attr('y2', 0)
    .transition()
    .duration(500)
    .attr('y1', (height - margin) - y(median))
    .attr('y2', (height - margin) - y(median));

  chart.append('g')
    .attr('transform', 'translate(-24, ' + (height - margin) + ' )')
    .attr('class', 'x axis')
    .call(xAxis)
    .selectAll('line')
    .selectAll('text')
    .attr('class', 'tick');

  let desc = chart
    .append('g');

  desc.append('text')
    .attr('class', 'text-success')
    .attr('x', width / 2)
    .attr('y', height - margin + 40)
    .text('- Median: ' + median);

  desc.append('text')
    .attr('class', 'text-info')
    .attr('x', width / 2)
    .attr('y', height - margin + 55)
    .text('- Standart deviation: ' + deviation);

  chart.exit().remove();
};

