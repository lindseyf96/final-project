import * as d3 from 'd3'
import * as topojson from 'topojson'

const margin = { top: 0, left: 0, right: 0, bottom: 0 }
const height = 500 - margin.top - margin.bottom
const width = 1100 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const colorScale = d3
  .scaleOrdinal()
  .range([
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray'
  ])

  const projection = d3.geoAlbersUsa()
  .scale(800)
  .translate([width / 3, height / 2])
const path = d3.geoPath().projection(projection)

Promise.all([
  d3.json(require('/data/us_states.json')),
  d3.csv(require('/data/splc-hate-groups-2018-geocodio.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

  function ready([json, datapoints]) {
  console.log('What is our data?')
  // console.log(json)
  
  const states = topojson.feature(json, json.objects.us_states)
  
  svg
    .selectAll('path')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', function(d) {
      console.log(d.properties.region_big)
      return colorScale(d.properties.region_big)
    })

  svg.selectAll('circle')
  .data(datapoints)
  .enter()
  .append('circle')
  .attr('r', 2)
  .attr('fill', 'red')
  .attr('stroke', 'white')
  // .attr('opacity', 0.5)
  .attr('transform', function(d){
    const coords = [d.Longitude, d.Latitude]
    return `translate(${projection(coords)})`
  })
 
}
