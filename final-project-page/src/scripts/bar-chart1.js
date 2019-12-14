import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 20, left: 95, right: 50, bottom: 20 }
const height = 200 - margin.top - margin.bottom
const width = 219 - margin.left - margin.right

const svg = d3
  .select('#bar-chart1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Build your scales here

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 160])
  .range([0, width])

const yPositionScale = d3
  .scaleBand()
  .domain([
    'Seattle',
    'Los Angeles',
    'Boston',
    'D.C.',
    'New York City',
  ])
  .range([0, height])
  .padding(0.25)

const y_axis = d3.axisLeft(yPositionScale)
svg
  .append('g')
  .attr('class', 'axis y-axis')
  .call(y_axis)
  .attr('font-size', 18)

d3.csv(require('../data/hate-crimes-race.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([0, 10])
  .html(function(d) {
    return ` <span style='color:white'>${d.number}</span>`
  })
  .direction('e')

svg.call(tip)

// const x_axis = d3.axisBottom(xPositionScale)
// svg
//   .append('g')
//   .attr('class', 'axis x-axis')
//   .attr('transform', 'translate(0,' + height + ')')
//   .call(x_axis)

function ready(datapoints) {
  // Add and style your marks here
  const x_axis = d3
    .axisTop(xPositionScale)
    .ticks(3)
    // .tickFormat(d => d + '%')
    .tickSize(-height)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    // .attr('transform', 'translate(0,' + height + ')')
    .call(x_axis)
    .lower()
  svg.selectAll('.axis line').attr('stroke', '#ccc')
  svg.selectAll('.axis path').attr('stroke', 'none')
  svg.selectAll('.axis text').attr('font-size', 14)
  svg.selectAll('.x-axis text').attr('fill', '#999999')

  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('width', function(d) {
      return xPositionScale(d.number)
    })
    .attr('height', yPositionScale.bandwidth())
    .attr('y', function(d) {
      return yPositionScale(d.city)
    })
    .attr('x', 0)
    // .attr('fill', '#67bea2')
    .attr('fill', function(d) {
      if (d.city == 'Seattle') {
        return "red"
      } else {
      return "lightgrey"
      }})
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  svg.selectAll('rect').each(function() {
    this.addEventListener('mouseover', function() {
      d3.select(this).attr('fill', '#b2d8d8')
    })
    this.addEventListener('mouseout', function() {
      d3.select(this).attr('fill', function(d) {
        if (d.city == 'Seattle') {
          return "red"
        } else {
        return "lightgrey"
        }})
    })
  })
}