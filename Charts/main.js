const elById = (target) => document.getElementById(target)
const elsByName = (name) => document.getElementsByName(name)

const inputData = (el) =>
{
    return el.value.indexOf(',') > -1
        ? el.value
            .split(',')
            .map(_ => Number(_))
            // .map(_ => Number(_)).filter(_ => typeof _ === 'number')
        : Number(el.value)
}

const w = inputData(elById('width'))
const d = inputData(elById('data-list'))
const getAttrByIdx = (w, d, i, id) => genAttr(id)(w, genSize(w, d), Number(i))

const genSize = (w, d) =>
{
    const unit = w / d.length
    const gap = unit / d.length
    const box = (((w - unit) / d.length) * d.length) + gap * d.length > w ? ((w - (unit * gap + d.length)) / d.length) : ((w - unit) / d.length) - gap
    const [maxY, minY] = [Math.max.apply(null, d), Math.min.apply(null, d)]
    return {
        d: d.length,
        gap,
        box,
        unit,
        width: w,
        height: 400,
        margin: 50,
        data: { text: { width: 30, height: 20 }, box },
        line: 1,
        x: i => Math.floor(unit * i),
        y: i => 300 - Math.floor((300 / (d.length)) / d.length) * i,
        idx: x => Math.floor((x - unit * 4 - 80) / (unit)) - 1
    }
}
const size = genSize(w, d)
const genAttr = (id) => (w, s, i, v) =>
{
    const [m, h, data, d] = [s.margin, s.height, s.data, s.d]
    const color = { bg: 'black', default: 'white', focus: 'red', blue: 'blue' }
    const style = { line: `stroke: ${id === 'mid' ? color.default : '#737373'}; stroke-width: ${s.line};` }
    const svg = {
        width: w,
        height: h,
        style: 'overflow:visible'
    }
    const list = {
        g: { width: w, height: h, style: 'overflow:visible' },
        gBox: {
            // fill: color.bg,
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
        indicatorLine: {
            x1: 0,
            y1: s.y(v),
            x2: s.width,
            y2: s.y(v),
            style: style.line,
        },
        line: {
            x1: s.x(i),
            y1: id === 'mid' ? 0 : -h,
            x2: s.x(i),
            y2: id === 'mid' ? h : h * 2,
            style: style.line,
        },

        dataText: {
            x: ((s.unit * i) - s.gap + s.unit / 2),
            y: s.y(v),
            fill: color.default,
            'dominant-baseline': 'start',
            'text-anchor': 'middle',
        },
        label: {
            x: 0,
            y: s.y(v),
            fill: color.default,
            'dominant-baseline': 'start',
            'text-anchor': 'middle',
        },
        plot: {
            cx: s.x(i),
            cy: s.y(v),
            r: 5,
            fill: "white"
        },

    }
    return { svg, ...list }
}
const setAttr = (el, attr) =>
{

    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return el
}

const genPath = (s) => (data) => 
{
    console.log(data)

    const genAxis = (i) =>
    {
        const [maxY, minY] = [Math.max.apply(null, data), Math.min.apply(null, data)]
        const sum = (Math.abs(maxY) + Math.abs(minY))
        const [height,margin] =[1500, 300]
        const yUnit = Math.floor(sum / d.length)
        const [maxUnit,minUnit] = [sum/yUnit/100,sum/yUnit/50]
        const a = ( Math.floor(((sum)/yUnit)*(i*minUnit))/yUnit)
        const obj =
        {
            x: Math.floor(s.unit * i),
            y: sum> height ? margin +200 -  a
                :margin + 200 - ( Math.floor(((sum)/yUnit)*(i*minUnit))/d.length)
        }
        return obj
    }
    let first = ''
    let last = ''
    let path = data.reduce((acc, cur, idx) =>
    {
        const [a, b] = [genAxis(idx).x, genAxis(cur).y]
        if (idx === 0) first = [a, b]
        if (idx === data.length - 1) last = a
        acc += ` ${a} ${b}`
        return acc
    }, 'M')
    // console.log(first, last)
    // path += (' '+last+' '+ 800 +' '+ first[0]+' '+ 800 + ' '+first.join(' '))

    console.log(path)
    // data
    return path
}
const genElement = (type, attr, animate) =>
{
    // console.log(type, attr)

    type = document.createElementNS('http://www.w3.org/2000/svg', type)
    for (const [t, v] of Object.entries(attr))
    {
        type.setAttributeNS(null, t, v)
    }
    return type

}

const svgDefinition = (id) =>
{
    const definition =
    {
        svg:
        {
            type: 'svg',
            attr: 'svg',
            id: id.svg
        },
        indicatorLine:
        {


            type: 'line',
            attr: 'indicatorLine',
            id: id.indicatorLine
        },
        line:
        {
            type: 'line',
            attr: 'line',
            id: id.lines,
        },
        g:
        {
            type: 'g',
            attr: 'g',
            id: id.g,
        },        
        path:
        {
            type: 'path',
            attr: 'path',
            id: 'path'
                }
    }
    return definition
}

const svgIdList =
{
    svg: 'svg',
    indicatorLine: 'indicatorLine',
    lines: ['v', 'h',],
    g: ['g', 'group'],
    path: 'path'
}
svgIdList[Symbol.toStringTag] = 'svgIdList'

const DOMEventAttr = {
    'width': 'input',
    'data-list': 'input',
    // 'start': 'click',
    'radio': 'click'
}
DOMEventAttr[Symbol.toStringTag] = 'DOMEventAttr'

const getElement = (w, arr, i) => (target, type, id) => genElement(type, genAttr(id)(w, genSize(w, arr), i)[target])



const updateTexts = (vars, copy) => (d, w) => (num, start, end, target) => 
{
    const _ = copy(vars)
    const g = _.initSVG['g']

    while (g.firstChild)
    {
        g.removeChild(g.firstChild)

    }

    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const createEl = getElement(w, d, i)
        const [textId, boxId] = [`text-${value}`, `box-${value}`]
        const [text, box, group] =
            [
                createEl('dataText', 'text', textId),
                createEl('label', 'rect', boxId),
                createEl('gBox', 'g'),
            ]

        text.textContent = value
        box.setAttribute('id', boxId)
        text.setAttribute('id', textId)

        if (value === num) box.setAttribute('fill', 'lemonchiffon'), text.setAttribute('fill', 'black')
        else if (value === start || value === end) box.setAttribute('fill', '#292a38f2')
        if (target !== 'bs' && value > num) box.setAttribute('stroke', 'lightseagreen')

        group.appendChild(box)
        group.appendChild(text)
        g.appendChild(group)

    }


}
const copyParams = (params) =>
{
    const copied = {}
    for (const variable of (params))
    {
        if (typeof variable === 'number') copied['width'] = variable
        else if (Array.isArray(variable)) copied['d'] = variable
        else if (variable[Symbol.toStringTag]) copied[variable[Symbol.toStringTag]] = variable
        else if (variable.name === undefined) copied[variable.tagName] = variable
        else if (typeof variable === 'function') copied[variable.name] = variable
    }
    return copied
}


/**
 * 데이터 입력시 데이터 업데이트
 */
const onChangeInput = (vars, copy) => (e) =>
{
    const _ = copy(vars)
    console.log(_)

    const wth = _.elById('width')
    const w = _.inputData(wth)
    const main = _.elById('main')
    let d = _.inputData(_.elById('data-list'))
    console.log(d)
    console.log(_)
    const radioNodeList = document.getElementsByName('radio')
    radioNodeList.forEach(n =>
    {
        if (n.checked && n.value === 'false')
        {
            d = Array.from(new Set(d))
        }
    })
    _.elById('data-list').value = `${(d)}`
    const { width } = main.getBoundingClientRect()
    if (w > width)
    {
        wth.value = width - 250
        w = width - 250
    }
    vars = [w, d, ...vars]
    // _.updateDefault(vars, copy)
    let newPath = genPath(genSize(w, d))(d)
    console.log(newPath)
    updatePath(_.SVGPathElement, newPath)
    console.log(newPath)
    _.updateTexts(vars, copy)(d, w)()

}


const updatePath = (el, d) =>
{
    // console.log(el,elById('path'),newPath)
    el.setAttribute('d', `${d}`)
    // return el
}
/**
 * !TODO: 정렬 -> 이진탐색 동기처리 시각화 구현
 */
const startSimulation = (vars, copy) => (e) =>
{


    const _ = copy(vars)
    const w = _.inputData(_.elById('width'))
    const d = _.inputData(_.elById('data-list'))
    const target = _.inputData(_.elById('target'))
    let sortRound = -1
    _.elById('search-answer').innerHTML = `waiting...`
    _.elById('search-count').innerHTML = `0`

 


}

/**
 * 초기 실행
 */





const svgList = Object.entries(svgDefinition(svgIdList))

const genSvgFromList = (list) =>
{
    const w = inputData(elById('width'))
    const d = inputData(elById('data-list'))
    const createdSVG = {}
    let temp = undefined

    for (const [name, info] of (Object.values(list)))
    {
        if (info.id)
        {
            if (Array.isArray(info.id))
            {
                for (const id of info.id)
                {
                    console.log(info, list)
                    temp = getElement(w, d)(info.attr, info.type, id)
                    setAttr(temp, { id: id })
                    const isIdNameSame = name === id
                    const isFirstTwoCharsSame = (name + id)[0] === (name + id)[1]
                    const _name = isIdNameSame ? id : isFirstTwoCharsSame ? id : name + (id[0].toUpperCase() + id.slice(1))
                    createdSVG[_name] = temp
                }
                continue
            }
            
        }
        temp = getElement(w, d)(info.attr, info.type)
        setAttr(temp, { id: info.id })
        createdSVG[name] = temp
    }
    console.log(createdSVG)
    createdSVG[Symbol.toStringTag] = 'initSVG'

    return createdSVG
}


const appendToSVG = (svg, svgArea, list) =>
{
    console.log(svg)
    for (const [key, el] of Object.entries(list))
    {
        if (key === 'svg') svgArea.appendChild(el)
        else svg.appendChild(el)
        // console.log(key,el)
    }
}

const addEventsToDOM = (vars, copy, list) =>
{
    let eventFunc = undefined

    for (const [target, event] of Object.entries(list))
    {
        console.log(target, event)
        if (target === 'start') eventFunc = elById(target).addEventListener(event, startSimulation(vars, copy))
        else if (target === 'radio')
        {
            elsByName(target).forEach(r => r.addEventListener(event, onChangeInput(vars, copy)))
            continue
        }
        else elById(target).addEventListener(event, onChangeInput(vars, copy))

    }
}
/**
 * 
 *  !!TODO :하드코딩 되어 있는부분 개선 필요
 */
const initParams = [
    inputData,
    elById,
    elsByName,
    genSize,
    genElement,
    getElement,
    genAttr,
    onChangeInput,
    startSimulation,
    updateTexts,
    setAttr,
    getAttrByIdx,
    genSvgFromList(svgList),
    DOMEventAttr,
    svgIdList,
    appendToSVG,
    addEventsToDOM
]





// const updateTexts = (vars, copy) => (d) => (num, start, end, target) => 
// {
//     const _ = copy(vars)
//     const g = _.initSVG['g']

//     while (g.firstChild)
//     {
//         g.removeChild(g.firstChild)

//     }



const update = (w, d, g) =>
{
    // const getPath = genPath(size)(d)
    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const createEl = getElement(w, d, i, value)
        const [textId, boxId] = [`text-${value}`, `box-${value}`]
        const [text, box, group] =
            [
                createEl('label', 'text', textId),
                createEl('plot', 'circle', boxId),
                createEl('gBox', 'g'),
            ]

        text.textContent = value
        box.setAttribute('id', boxId)
        text.setAttribute('id', textId)
        group.appendChild(box)
        group.appendChild(text)
        g.appendChild(group)

    }
}




let idx = undefined
let value = undefined
const onMove = (e, idx) => 
{
    // console.log(e)    
    if (idx !== size.idx(e.clientX))
    {
        // idx = e.clientX
        if (value !== undefined)
        {
            elById(`box-${value}`).setAttribute('fill', 'white')
            elById(`text-${value}`).setAttribute('fill', 'white')
        }
        console.log(e.clientX)
        idx = size.idx(e.clientX)
        console.log(idx)
        value = d[idx]
        setAttr(line, getAttrByIdx(w, d, value).moveY)
    } else
    {
    }
    line2.setAttribute('x1', e.clientX - 160)
    line2.setAttribute('x2', e.clientX - 160)


}


const init = (vars, copy) =>
{

    const _ = copy(vars)
    const d = _.inputData(_.elById('data-list'))
    const w = _.inputData(_.elById('width'))
    const svg = genElement('svg', genAttr('svg')(w, genSize(w, d)).svg)
    const g = genElement('g', genAttr('g')(w, genSize(w, d)).g)
    const path = genElement('path', {
        d: genPath(size)(d), ...genAttr('path')(w, genSize(w, d)).path
    })
    const line = genElement('line',
        genAttr('line')(w, genSize(w, d)).indicatorLine
    )
    const line2 = genElement('line',
        genAttr('line')(w, genSize(w, d)).line
    )
    const svgArea = elById('svg-area')
    // svg.appendChild(g)
    // svg.appendChild(line)
    // svg.appendChild(line2)
    // svg.appendChild(path)
    // update(w, d, g)

    console.log(d.length)

    const mouseOn = () => svg.addEventListener('mousemove', onMove)
    const mouseOut = () => svg.removeEventListener('mousemove', onMove)
    svg.addEventListener('mouseenter', mouseOn)
    svg.addEventListener('mouseleave', mouseOut)
    _.initSVG = { ..._.initSVG, path }
    vars = [path, ...vars]
    console.log(vars)
    _.appendToSVG(_.initSVG['svg'], svgArea, _.initSVG)
    _.addEventsToDOM(vars, copy, _.DOMEventAttr)
    _.updateTexts(vars, copy)(d, w)()

}
init(initParams, copyParams)
