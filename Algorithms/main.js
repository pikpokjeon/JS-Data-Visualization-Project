const elById = (target) => document.getElementById(target)

const inputData = (el) =>
{
    return el.value.indexOf(",") > -1
        ? el.value
            .split(",")
            .map((_) => Number(_))
            .filter((v) => typeof v === "number" && v)
        : Number(el.value)
}

const genSize = (w, d) =>
{
    const unit = (w + 80 - 80 / d.length) / d.length
    const gap = unit / d
    const box = ((w)/d.length) * d.length > w ? ((w)/d.length) - d.length : ((w)/d.length)
    return {
        d: d.length,
        gap,
        box,
        unit,
        width: w,
        height: 500,
        margin: 50,
        data: { text: { width: 30, height: 20 }, box },
        line: 3,
    }
}

const genElement = (type, attr) =>
{
    type = document.createElementNS("http://www.w3.org/2000/svg", type)
    for (const [t, v] of Object.entries(attr))
    {
        type.setAttributeNS(null, t.toLowerCase(), v)
    }
    return type

}
/**
 *   요소의 x거리를 알아야 하는 경우에는 i를 인자로 받음
 * */
const genAttr = (w, s, i) =>
{
    const [m, h, data, d] = [s.margin, s.height, s.data, s.d]
    const dataBox = {width:data.box - d/s.unit/d,height:data.box - d/s.unit/d}
    const color = { bg: "black", default: "white", focus: "red" }
    const style = { line: `stroke: ${color.default}; stroke-width: ${s.line}` }
    const svg = {
        width: w,
        height: h,
        viewBox: `${m} ${m} ${w} ${h}`,
    }
    const list = {
        g: {},
        eventArea: {
            ...svg,
            fill: color.bg,
        },
        indicatorLine: {
            x1: h + m,
            y1: 0,
            x2: h + m,
            y2: h,
            style: style.line,
        },
        dataText: {
            width: data.text.width,
            height: data.text.height,
            x: (i * s.unit),
            y: h / 2 - m,
            fill: color.default,
            "dominant-baseline": "end",
            "text-anchor": "end",
        },
        dataBox: {
            width: dataBox.width,
            height: dataBox.height,
            x: ( (data.box + s.unit/d)*i) +s.unit/d,
            y: h / 2 - s.unit/2,
            stroke: color.default,
            "stroke-width": s.line,
        },
        line: {
            x1: h + s.gap,
            y1: 0,
            x2: h + s.gap,
            y2: h,
            style: style.line,
        },
    }
    return { svg, ...list }
}

// TODO: 요소를 생성
const getElement = (w, arr, size, gen, attr, i) => (target, type) =>
    gen(type, attr(w, size(w, arr), i)[target])

const width = inputData(elById("width"))
const d = inputData(elById("data-list"))
const textParams = [width, d, genSize, getElement, genElement, genAttr]
const createEl = getElement(width, d, genSize, genElement, genAttr)
const svg = createEl("svg", "svg")
const eventArea = createEl("eventArea", "rect")
const group = createEl("g", "g")
const line = createEl("indicatorLine", "line")
elById("svg-area").appendChild(svg)
svg.appendChild(eventArea)
svg.appendChild(group)
group.appendChild(line)

const updateTexts = (w, d, size, get, gen, attr) => (g) =>
{
    while (g.firstChild)
    {
        g.removeChild(g.lastChild)
    }
    for (const [i,text] of (Array.from(Object.entries(d))))
    {
        const createEl = get(w, d, size, gen, attr, i)
        const [data, box, group] = [
            createEl("dataText", "text"),
            createEl("dataBox", "rect"),
            createEl("g", "g"),
        ]
        data.textContent = text
        group.appendChild(box)
        group.appendChild(data)
        g.appendChild(group)

    }
}

const copyParams = (params) =>
{
    const copied = {}
    for (const variable of (params))
    {
        if (variable.name === undefined)
        {
            copied[variable.tagName] = variable
        } else if (typeof variable === "function")
        {
            copied[variable.name] = variable
        }
    }
    return copied
}


const onChangeInput = (vars, copy) => (e) =>
{
    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))
    _.updateTexts(w, d, _.genSize, _.getElement, _.genElement, _.genAttr)(_.g)
}

const initParams = [
    inputData,
    elById,
    genSize,
    genElement,
    getElement,
    genAttr,
    onChangeInput,
    updateTexts,
    group,
    svg,
    line,
]
const init = (vars, copy) =>
{
    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))
    const onChangeInput = _.onChangeInput(vars, copy)
    _.elById("width").addEventListener("input", onChangeInput)
    _.elById("data-list").addEventListener("input", onChangeInput)
    _.updateTexts(w, d, _.genSize, _.getElement, _.genElement, _.genAttr)(_.g)
}
init(initParams, copyParams)
// 제너레이터로 svg 지우고 -> 엘레먼트를 추가하는 과정들을 반복해준다.
