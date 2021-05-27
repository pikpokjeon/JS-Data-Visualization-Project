
import { svgDefinition, svgIdList, DOMEventAttr } from './definition.js'
import { getElement } from './pipeline.js'
import { updateAttr } from './update.js'
const genSize = (w, d) =>
{
    const unitX = w / d.length
    const gap = unitX / d.length
    const [height, margin] = [300, 50]
    const [maxData, minData] = [Math.max(...Array.from(d)), (Math.min(...Array.from(d)))]
    const MAX = Math.max(maxData, Math.abs(minData))
    const SUM = (maxData + Math.abs(minData))
    const unitY = (height) / MAX
    return {
        d: d.length,
        gap,
        unitX,
        unitY,
        MAX,
        SUM,
        maxData,
        minData,
        leftMargin: 155,
        width: w,
        eventArea: { width: w, height: 750 },
        data: { text: { width: 30, height: 20 } },
        line: 1,
        x: i => Math.floor(unitX * i) + margin,
        y: v => margin + ((MAX - v)) * (unitY),
        idx: x => Math.floor(((x) / (unitX + gap)))
    }
}



const genElement = (type, attr, animate) =>
{

    type = document.createElementNS('http://www.w3.org/2000/svg', type)

    for (const [t, v] of Object.entries(attr))
    {
        type.setAttributeNS(null, t, v)
    }

    return type

}

const genAttr = (w, d, i, v) =>
{
    const s = genSize(w, d)
    const h = s.eventArea.height
    const color = { bg: '#10161f', default: 'white', focus: 'red', blue: 'blue' }
    const style = { line: `stroke: ${ color.default }; stroke-width: ${s.line};` }
    const svg = {
        width: w,
        height: h,
        style: 'overflow:visible, opacity: 0.3',
        fill: color.bg,
    }
    const list = {
        g: { width: w, height: h, style: 'overflow:visible' },
        gBox: {
        },
        path: {
            stroke: 'white', fill: "transparent", strokeWidth: 3
        },
        focusLine: {
            'attributeName': 'stroke-width',
            'attributeType': 'XML',
            'values': '3;1;3;1',
            'dur': '2s',
            'repeatCount': '5',
        },
        moveX: {
            x1: s.x(i),
            x2: s.x(i),
        },
        moveY: {
            y1: s.y(i),
            y2: s.y(i),
        },
        eventArea: {
            ...svg,
            // fill: color.bg,
        },
        lineH: {
            x1: 0,
            y1: s.y(v),
            x2: s.width,
            y2: s.y(v),
            style: style.line,
        },
        lineV: {
            x1: s.x(i),
            y1: -h,
            x2: s.x(i),
            y2: h * 2,
            style: style.line,
        },
        borderLine: {
            x1: s.x(i),
            y1: -h,
            x2: s.x(i),
            y2: h * 2,
            style: style.line + " stroke-dasharray:5,5;",
        },
        label: {
            x: s.x(i) ,
            y: h - 50,
            fill: color.default,
            'dominant-baseline': 'start',
            'text-anchor': 'middle',
        },
        dataText: {
            x: 50,
            y: s.y(v),
            fill: color.default,
            'dominant-baseline': 'end',
            'text-anchor': 'middle',
        },
        plot: {
            cx: s.x(i),
            cy: s.y(v),
            r: 5,
            fill: "white"
        },
        stop: {
            style: 'stop-color: white'
        },
        stop1: { offset: '0%', style: 'stop-color: white; stop-opacity: 0.7' },
        stop2: { offset: '50%', style: 'stop-color: #00f0ff; stop-opacity: 0.4' },
        stop3: { offset: '100%', style: 'stop-color: #4d00ff; stop-opacity: 0' },
        linearGradient: {  //fill
            x1: '0%',
            x2: '0%',
            y1: '0%',
            y2: '100%',
        },
        fillG: {
            'clip-path': 'url(#frame)'
        },
        fillBG: {
            x: 0,
            y: 600,
            width: w,
            height: 600,
            fill: 'url(#fill)'
        },
        clipPath: { // frame
        },
        fillPath: {
        },
        defs: {
        },
        filter: {
            x: '-7',
            y: '-7',
            width: '14',
            height: '14',
        },
        feGaussianBlur: {
            stdDeviation:"2"
        }

    }
    return { svg, ...list }
}



const genSvgFromList = (list, w, d, i, v) =>
{
    const createdSVG = {}
    let temp = undefined

    // const List = (Object.values(list))
    // console.log(List.forEach(e => console.log(e)))
    
    for (const [name, info] of (Object.values(list)))
    {

        if (info.id)
        {
            if (Array.isArray(info.id))
            {
                for (const id of info.id)
                {
                    if (Array.isArray(info.attr))
                    {
                        for (const attr of info.attr)
                        {
                            temp = getElement(w, d, i, v)(attr, info.type, id)
                            updateAttr(temp, { id: id, name: info.name })
                            createdSVG[attr] = temp
                        }
                    }
                    else
                    {
                        temp = getElement(w, d, i, v)(info.attr, info.type, id)
                        updateAttr(temp, { id: id, name: info.name })
                        createdSVG[id] = temp
                    }

                }
                continue
            }
        }
        temp = getElement(w, d, i, v)(info.attr, info.type)
        updateAttr(temp, { id: info.id, name: info.name })
        createdSVG[name] = temp
    }

    // createdSVG[Symbol.toStringTag] = name
    // return createdSVG
    return {
        named: name =>
        {
            createdSVG[Symbol.toStringTag] = name
            return createdSVG
        }
    }
}


/**
 * @param {*} d 차트 데이터배열
 * @param {*} type 라인타입
 * step 선 (x1,y1)((x1+x2)/2,y1)((x1+x2)/2,y2)(x2,y2)
 */
const genPath = (d, type) => (size) =>
{
    let prev = []
    const path = d.reduce((acc, cur, i) =>
    {
        const [a, b] = [size.x(i), size.y(cur)]
        const midX = (prev[0] + a) / 2
        if (i > 0 && type !== 'default')
        {
            acc += type === "step" ? ` ${midX} ${prev[1]}` : i === 1 ? `C ${midX} ${prev[1]}` : 'S'
            acc += ` ${midX} ${b}`
        }
        acc += ` ${a} ${b}`
        prev = [a, b]
        return acc

    }, 'M')
    return {
        path: path,
        fill: path + ` V 800 H 0Z`
    }
}


const genSvgList = (target) =>
{
    return {
        setID: ids => Object.entries(svgDefinition(ids)[target])
    }
}



export { genAttr, genSize, genPath, genElement, genSvgFromList, genSvgList }