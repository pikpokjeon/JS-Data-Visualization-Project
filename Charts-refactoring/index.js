import {genSVG} from '../lib/svg.js'

const svgArea = document.getElementById('svg-area')

const rect1 = genSVG('rect').attr({
    width: 200,
    height: 600,
    fill: 'red',
    x: 200,
    y: 300,
})
const rect2 = genSVG('rect').attr({
    width: 100,
    height: 400,
    fill: 'blue',
    x: 250,
    y: 100,
})

const svg = genSVG('svg')
    .attr({width: 1200, height: 600, x: 200, y: 300})
    .append([
        genSVG('g').append([
            rect1, rect2,
            genSVG('rect').attr({
                width: 400,
                height: 100,
                fill: 'yellow',
                x: 200,
                y: 300,
            })
        ])
    ])


svgArea.appendChild(svg)
