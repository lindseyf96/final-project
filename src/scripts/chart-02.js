import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 20, left: 70, right: 0, bottom: 0 }
const height = 500 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const projection = d3.geoAlbersUsa().scale(850)
  .translate([width/2, height/2])

const path = d3.geoPath().projection(projection)
const colorScale = d3.scaleSequential(d3.interpolateOrRd).domain([100000, 1000])

d3.json(require('/data/salaries.json'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

  function ready(json) {
  const states = topojson.feature(json, json.objects.salaries)
  //console.log(json)
  
  const tip = d3
    .tip()
    .attr('class', 'd3-tip')
    .offset([20, 100])
    // .style('position', 'responsive')
    // .html(function(d) {
    //   return `<b>1 out of</b> <span style='color:red'>${d.properties.teacher_sa} people committed a hate crime</span>`
    // })
    .html(function(d) {
    if (d.properties.teacher_sa == 0) {
      return `${d.properties.NAME}: <b>N/A</b>`
    } else {
    return `<b>${d.properties.NAME}: 1 out of</b> <span style='color:red'>${d.properties.teacher_sa}</span> <b>people committed a hate crime</b></span>`
    }})
  
  svg.call(tip)
  
  svg
    .selectAll('path')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', d => {
    //   return colorScale(d.properties.teacher_sa)
    // })ws
    if (d.properties.teacher_sa == 0) {
      return "lightgrey"
    } else {
    return colorScale(d.properties.teacher_sa)
    }})
    .on('mouseenter', function(d) {
      d3.select(this)
        .attr('stroke', 'white')
        .attr('fill', 'lightpink')
    })
    .on('mouseleave', function(d) {
      d3.select(this)
        .attr('stroke', 'none')
        .attr('fill', d => {
          //   return colorScale(d.properties.teacher_sa)
          // })ws
          if (d.properties.teacher_sa == 0) {
            return "lightgrey"
          } else {
          return colorScale(d.properties.teacher_sa)
          }})
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

    svg.selectAll('text')
  .data(states.features)
  .enter()
  .append('text')
  .style('fill', '#50575E')
  // .style('fill', 'black')
  .text(function(d){
    if (d.properties.STUSPS === 'DC') {
    }
    else if (d.properties.STUSPS === 'PR') {
    }
    else {
    //console.log(d) 
      return d.properties.STUSPS
    }})
  .attr('transform', function(d){
    //console.log(path.centroid(d))
    // console.log(projection[-74, 48])
    return `translate(${path.centroid(d)})` 
  })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', 12)
    .attr('dy', function(d) {
      if (d.properties.STUSPS === 'DC') {
        return 40
      } 
      if (d.properties.STUSPS === 'MI') {
        return 20
      }
      else {
        return 0
      }
    })
    .attr('dx', function(d) {
      if (d.properties.STUSPS === 'DC') {
        return 40
      } else if (d.properties.STUSPS === 'DE') {
        return 10
      } else if (d.properties.STUSPS === 'MI') {
        return 10 
      } else if (d.properties.STUSPS === 'FL') {
        return 10
      } else if (d.properties.STUSPS === 'LA') {
        return -8 
      }
      else {
        return 0
      }
    })
    // .attr('dy', function(d) {
    //   if (d.properties.STUSPS === 'MI') {
    //     return 20
    //   } else {
    //     return 0
    //   }
    // })
    // .attr('dx', function(d) {
    //   if (d.properties.STUSPS === 'MI') {
    //     return 10 
    //   } else if (d.properties.STUSPS === 'FL') {
    //     return 10
    //   } else {
    //     return 0
    //   }
    // })

// Handmade legend
svg
.append('rect')
.attr('x', -55)
.attr('y', 20)
.attr('width', 20)
.attr('height', 20)
.style('fill', '#B72F26')
svg
.append('rect')
.attr('x', -55)
.attr('y', 40)
.attr('width', 20)
.attr('height', 20)
.style('fill', '#E8563C')
svg
.append('rect')
.attr('x', -55)
.attr('y', 60)
.attr('width', 20)
.attr('height', 20)
.style('fill', '#ED774F')
svg
.append('rect')
.attr('x', -55)
.attr('y', 80)
.attr('width', 20)
.attr('height', 20)
.style('fill', '#F5B781')
svg
.append('rect')
.attr('x', -55)
.attr('y', 100)
.attr('width', 20)
.attr('height', 20)
.style('fill', '#F9D5A3')
svg
.append('rect')
.attr('x', -55)
.attr('y', 120)
.attr('width', 20)
.attr('height', 20)
.style('fill', '#FCE9CC')
svg
.append('rect')
.attr('x', -55)
.attr('y', 140)
.attr('width', 20)
.attr('height', 20)
.style('fill', '#FEF8ED')
svg
.append('text')
.attr('x', -70)
.attr('y', -5)
.text('1 out of')
.style('font-size', '15px')
.attr('alignment-baseline', 'middle')
.attr('fill', 'white')
svg
.append('text')
.attr('x', -65)
.attr('y', 10)
.text('2,000')
.style('font-size', '15px')
.attr('alignment-baseline', 'middle')
.attr('fill', 'white')

svg
.append('text')
.attr('x', -70)
.attr('y', 170)
.text("1 out of")
.style('font-size', '15px')
.attr('alignment-baseline', 'middle')
.attr('fill', 'white')

svg
.append('text')
.attr('x', -70)
.attr('y', 185)
.text("600,000")
.style('font-size', '15px')
.attr('alignment-baseline', 'middle')
.attr('fill', 'white')


}