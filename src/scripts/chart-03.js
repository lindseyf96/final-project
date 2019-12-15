import * as d3 from 'd3'
import d3Annotation from 'd3-svg-annotation'

const margin = { top: 40, left: 80, right: 40, bottom: 40 }
const height = 350 - margin.top - margin.bottom
const width = 600 - margin.left - margin.right

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Normal scales

const xPositionScale = d3
  .scaleLinear()
  .domain([1997, 2031])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 1400])
  .range([height, 0])

// const line = d3
//   .line()
//   .x(d => xPositionScale(d.day))
//   .y(d => yPositionScale(d.temperature))

d3.csv(require('../data/groups_per_year.csv'))
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

function ready(datapoints) {
  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', d => {
      return xPositionScale(d.year)
    })
    .attr('cy', d => {
      return yPositionScale(d.number)
    })
    .attr('fill', 'white')
    .raise()

    svg 
    .append('rect')
    .attr('class', 'rect_thing')
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 200)
    .attr("width", width)
    .attr('fill', '#080401')
    .lower()

    svg
    .append('text')
    .attr('class', 'annotation1')
    .text('If trends continue,')
    .attr('x', 292)
    .attr('y', 162)
    .style('fill', '#080401')
    .attr('font-size', 14)
    .lower()

    svg
    .append('text')
    .attr('class', 'annotation2')
    .text('the number of hate')
    .attr('x', 292)
    .attr('y', 177)
    .style('fill', '#080401')
    .attr('font-size', 14)
    .lower()

    svg
    .append('text')
    .attr('class', 'annotation3')
    .text('groups could rise')
    .attr('x', 292)
    .attr('y', 192)
    .style('fill', '#080401')
    .attr('font-size', 14)
    .lower()

    svg
    .append('text')
    .attr('class', 'annotation4')
    .text('to 1,298 in 2030')
    .attr('x', 292)
    .attr('y', 208)
    .style('fill', '#080401')
    .attr('font-size', 14)
    .lower()

    svg
    .append('text')
    .attr('x', -165)
    .attr('y', -60)
    .text('Hate groups')
    .attr('transform', function(d) {
      return 'rotate(-90)'
    })
    .attr('fill', 'white')

    svg
    .append('text')
    .attr('x', 237)
    .attr('y', 310)
    .text('Year')
    .attr('fill', 'white')


    svg
    .append('line')
    .attr('class', 'annotation-line-1')
    .attr('x1', xPositionScale(2029.90))
    .attr('y1', yPositionScale(500))
    .attr('x2', xPositionScale(2029.90))
    .attr('y2', yPositionScale(1260))
    .attr('stroke', '#080401')
    .attr('stroke-width', '1.5px')
    .lower()

    svg
    .append('line')
    .attr('class', 'annotation-line-2')
    .attr('x1', xPositionScale(2029.90))
    .attr('y1', yPositionScale(500))
    .attr('x2', xPositionScale(2027))
    .attr('y2', yPositionScale(500))
    .attr('stroke', '#080401')
    .attr('stroke-width', '1.5px')
    .lower()


    // Add your annotations
    // const annotations = [
    //   {
    //     note: {
    //       // label: 'Longer text to show text wrapping',
    //       title: 'Here is an annotation'
    //     },
    //     connector: {
    //       // lineType: "vertical",
    //     },
    //     color: ["white"],
    //     y: 100,
    //     x: 400,
    //     dy:50,
    //     dx:50,
    //   }]
    
    // const makeAnnotations = d3Annotation.annotation()
    //   .annotations(annotations)
    
    // svg.call(makeAnnotations).attr('class', 'annotation').lower()
   


     svg
    .append('line')
    .attr('class', 'line1')
    .attr('x1', xPositionScale(2000))
    .attr('y1', yPositionScale(655))
    .attr('x2', xPositionScale(2018))
    .attr('y2', yPositionScale(1045))
    .attr('stroke', 'red')
    .attr('stroke-width', '2.5px')
    .lower()

    svg
    .append('line')
    .attr('class', 'line2')
    .attr('x1', xPositionScale(2018))
    .attr('y1', yPositionScale(1045))
    .attr('x2', xPositionScale(2030))
    .attr('y2', yPositionScale(1298))
    .attr('stroke', 'red')
    .attr('stroke-width', '2.5px')
    .style("stroke-dasharray", ("3, 3"))
    .lower()




  const xAxis = d3.axisBottom(xPositionScale)
  .tickSize(0)
  .ticks(7)
  .tickFormat(d3.format("d"))

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .style("font", "14px times")
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickValues([200, 400, 600, 800, 1000, 1200, 1400])
    .tickSizeOuter(0)
  
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .style("font", "14px times")
    // .attr('transform', 'translate('-8 + ',0)')
    .attr('transform', `translate(0, 0)`)
    .call(yAxis)
    // .showYAxis(false)


  svg.selectAll('.y-axis path').attr('stroke', 'white')
  svg.selectAll('.x-axis path').attr('stroke', 'white')
  svg.selectAll('.y-axis').attr('stroke', 'white')
  svg.selectAll('.x-axis').attr('stroke', 'white')




// animation attempts:

  // const curtain = svg
  //   .append('rect')
  //   .attr('class','test')
  //   .attr('x', -1.5 * width)
  //   .attr('y', -1 * height)
  //   .attr('height', height)
  //   .attr('width', width)
  //   .attr('class', 'curtain')
  //   .attr('transform', 'rotate(180)')
  //   .style('fill', 'white')

  // d3.select('#line1').on('stepin', function() {
  //   // svg.selectAll('rect').attr('fill', 'white')
  //   curtain
  //     .transition()
  //     .duration(2000)
  //     // .ease('linear')
  //     .attr('x', -2 * 700)
  // })

  // d3.transition().selectAll(".line")
  // .duration(500)
  // .delay(function(d, i) { return i * 500; })
  // .ease("linear")
  // .attr("d", function(d){return line(d.values); })


d3.select('#chart-3').on('stepin', function() {
  console.log('rect selected')

  svg
  .select('.rect_thing')
  .transition()
  .duration(2000)
  .attr("x", width)
  svg
  .select('.annotation1')
  .transition()
  .delay(1500)
  .duration(2000)
  .style("fill","white")
  svg
  .select('.annotation2')
  .transition()
  .delay(1500)
  .duration(2000)
  .style("fill","white")
  svg
  .select('.annotation3')
  .transition()
  .delay(1500)
  .duration(2000)
  .style("fill","white")
  svg
  .select('.annotation4')
  .transition()
  .delay(1500)
  .duration(2000)
  .style("fill","white")
  svg
  .select('.annotation-line-1')
  .transition()
  .delay(1500)
  .duration(2000)
  .attr("stroke","white")
  svg
  .select('.annotation-line-2')
  .transition()
  .delay(1500)
  .duration(2000)
  .attr("stroke","white")



  //annotation animation here later
})

} 

// (.tickPadding(10))


