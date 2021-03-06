
import { svgDefinition, svgIdList, DOMEventAttr } from './definition.js'
import { getElement } from './pipeline.js'
import { updateAttr } from './update.js'

const genSize = (w, d) =>
{
    const [height, margin] = [250, 100]
    const unitX = (w - margin) / d.length
    const gap = unitX / d.length
    const [maxData, minData] = [Math.max(...Array.from(d)), (Math.min(...Array.from(d)))]
    const MAX = Math.max(maxData, Math.abs(minData))
    const SUM = (maxData + Math.abs(minData))
    const unitY = (height) / MAX
    return {
        d: d.length,
        gap,
        unitX,
        unitY,
        margin,
        MAX,
        SUM,
        maxData,
        minData,
        leftMargin: 155,
        width: w,
        eventArea: { width: w, height: 750 },
        data: { text: { width: 30, height: 50 } },
        msgBox: { width: 200, height: 150 },
        line: 1,
        x: i => Math.floor(unitX * i) + margin,
        y: v => margin + ((MAX - v)) * (unitY),
        idx: x => Math.floor((x - (w / d.length)) / (unitX))
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
    const color = { bg: '#141d31', default: 'white', focus: 'red', purple: '#9f57ff', blue: '#00f3ff' }
    const style =
    {
        line: `stroke: ${color.default}; stroke-width: ${s.line};`,
        opacity: (n) => `opacity: ${n}`
    }
    const svg = {
        width: w,
        height: h,
        style: `overflow:visible, ${style.opacity(0.8)}`,
        // fill: color.bg,

    }
    const list = {
      g: { width: w, height: h, style: "overflow:visible" },
      gBox: {},
      path: {
        stroke: color.default,
        fill: "transparent",
        strokeWidth: 10,
      },
      focusLine: {
        attributeName: "stroke-width",
        attributeType: "XML",
        values: "3;1;3;1",
        dur: "2s",
        repeatCount: "5",
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
        style: style.opacity(0.2),
        // fill: color.bg,
      },
      lineH: {
        x1: 0,
        y1: s.y(v),
        x2: s.width,
        y2: s.y(v),
        style: style.line + style.opacity(0.3),
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
        style: style.line + " stroke-dasharray:5,5;" + style.opacity(0.5),
      },
      label: {
        x: s.x(i),
        y: h - 30,
        fill: color.default,
        "dominant-baseline": "start",
        "text-anchor": "middle",
        "font-family": "Roboto",
      },
      dataText: {
        x: 40,
        y: s.y(v),
        fill: color.default,
        "dominant-baseline": "end",
        "text-anchor": "middle",
        "font-family": "Roboto",
      },
      plot: {
        cx: s.x(i),
        cy: s.y(v),
        r: 5,
        fill: "white",
      },
      stop0: { offset: "0%", style: "stop-color: #9bffc9; stop-opacity: 1" },
      stop1: { offset: "30%", style: "stop-color: white; stop-opacity: 0.8" },
      stop2: { offset: "50%", style: "stop-color: #00f0ff; stop-opacity: 0.2" },
      stop3: { offset: "100%", style: "stop-color:#4b00ff; stop-opacity: 0" },
      linearGradient: {
        //fill
        x1: "0%",
        x2: "0%",
        y1: "0%",
        y2: "100%",
      },
      fillG: {
        "clip-path": "url(#frame)",
      },
      fillBG: {
        x: 0,
        y: 700,
        width: w,
        height: 700,
        fill: "url(#fill)",
      },
      clipPath: {
        // frame
      },
      fillPath: {
        // filter: 'url(#lineShadow)',
        fill: color.default,
      },
      defs: {},
      filter: {
        x: "0",
        y: "-10",
        width: "14",
        height: "14",
      },
      feGaussianBlur: {
        stdDeviation: "2.5",
      },
      msgTitle: {
        x: 30,
        y: 30,
        fill: color.default,
        "dominant-baseline": "start",
        "text-anchor": "start",
        "font-family": "Roboto",
      },
      msgValue: {
        x: 70,
        y: 30,
        fill: color.default,
        "dominant-baseline": "start",
        "text-anchor": "start",
        "font-family": "Roboto",
      },
      msgBox: {
        x: 0,
        y: 0,
        width: s.msgBox.width,
        height: s.msgBox.height,
        fill: color.bg,
        style: "opacity:0.65;stroke:black;stroke-width:1",
      },
      msgShadow: {
        x: 0,
        y: 0,
        width: s.msgBox.width,
        height: s.msgBox.height,
        fill: "black",
        filter: "url(#msgFilter)",
        style: "opacity:0.4",
        stroke: 1,
      },
      msgGroup: {
        transform: `translate(100,100)`,
      },
      bar: {
        x: s.x(i),
        y: s.y(v),
        width: 7,
        height: 10,
        fill: color.default,
        rx: 10,
        ry: 10,
      },
    };
    return { svg, color, style, ...list }
}


// const genElById = (w, d, i, v) => (attr,info,id) =>
// {
//     const el = getElement(w, d, i, v)(attr, info.type, id)
//     updateAttr(el, { id: id, name: info.name })
//     return el
// }

const genSvgFromList = (list, w, d, i, v) =>
{
    const createdSVG = {}
    let temp = undefined

    // ! TODO: need to simplify the logic

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
 * @param {*} d ?????? ???????????????
 * @param {*} type ????????????
 * step ??? (x1,y1)((x1+x2)/2,y1)((x1+x2)/2,y2)(x2,y2)
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
        fill: path + ` V 700 H 100Z`
    }
}


const genSvgList = (target) =>
{
    return {
        setID: ids => Object.entries(svgDefinition(ids)[target])
    }
}

const genRandomChartData = (size) =>
{

    const a = size.minData - Math.floor(1000 - Math.random() * 1000)
    const b = Math.floor(Math.random() * 1000)
    return (size.maxData + a + b) * 1.5
}



export { genAttr, genSize, genPath, genElement, genSvgFromList, genSvgList, genRandomChartData }