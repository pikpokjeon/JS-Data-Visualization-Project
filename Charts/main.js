const _id = (target) => document.getElementById(target)
const _name = (name) => document.getElementsByName(name)

const inputData = (el) =>
{
    return el.value.indexOf(',') > -1
        ? el.value
            .split(',')
            .map(_ => Number(_))
        : Number(el.value)
}


const getAttrByIdx = (w, d, i, id) => genAttr(id)(w, genSize(w, d), Number(i))

const genSize = (w, d) =>
{
    const unitX = w / d.length
    const gap = unitX / d.length
    const [height, margin] = [400, -50]
    const [maxData, minData] = [Math.max(...Array.from(d)), (Math.min(...Array.from(d)))]
    const MAX = Math.max(maxData, Math.abs(minData))
    const SUM = (maxData + Math.abs(minData))
    const unitY = (height) / MAX
    return {
        d: d.length,
        gap,
        unitX,
        unitY,
        width: w,
        eventArea: {width: w, height: SUM},
        data: { text: { width: 30, height: 20 } },
        line: 1,
        x: i => Math.floor(unitX * i),
        y: v =>  margin + ((MAX - v ))  *  (unitY),
        idx: x => Math.floor((x - unit * 4 - 80) / (unit)) - 1
    }
}


// const size = genSize(w, d)
const genAttr = (id) => (w, s, i, v) =>
{
    const d = inputData(_id('data-list'))
    const h =  s.eventArea.height
    const unit = w / d.length
    const gap = unit / d.length
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
            x: 0,
            // ((s.unit * i) - s.gap + s.unit / 2)
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



const updateAttr = (el, attr) =>
{
    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return el
}



const genPath = (s) => (data) => data.reduce((acc, cur, i) =>
{
    const [a, b] = [s.x(i), s.y(cur)]
    if (i === 0) first = [a, b]
    if (i === data.length - 1) last = a
    acc += ` ${a} ${b}`
    return acc

}, 'M')


// console.log(first, last)
// path += (' '+last+' '+ 800 +' '+ first[0]+' '+ 800 + ' '+first.join(' '))



const genElement = (type, attr, animate) =>
{

    type = document.createElementNS('http://www.w3.org/2000/svg', type)

    for (const [t, v] of Object.entries(attr))
    {
        type.setAttributeNS(null, t, v)
    }

    return type

}


const svgDefinition = (id) =>
{
    const singleSVG =
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

    const multipleSVG =
    {
        dataText:
        {
            type: 'text',
            attr: 'dataText',
            id: id.svg
        },
        plot:
        {
            type: 'line',
            attr: 'indicatorLine',
            id: id.indicatorLine
        },
        gBox:
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

    const svgDefs =
    {
        singleSVG, multipleSVG
    }
    console.log(svgDefs)
    return svgDefs
}


/**
 * 동적으로 id를 생성해 줘야하는 경우, 
 * 원본 객체를 건드리지 않고 id 정보를 추가
 */
const svgIdList =
{
    svg: 'svg',
    indicatorLine: 'indicatorLine',
    lines: ['v', 'h',],
    g: ['g', 'group'],
    path: 'path'
}
svgIdList[Symbol.toStringTag] = 'svgIdList'


const setSvgId = (list) => (el, id) => ({ ...list, el: id })

console.log(setSvgId(svgIdList)('b', `text-${5}`))


/**
 * 사용할 이벤트리스너 정의
 */
const DOMEventAttr = {
    'svg': 'mouseenter',
    'svg': 'mouseleave',
    'width': 'input',
    'data-list': 'input',
    // 'start': 'click',
    'radio': 'click'
}
DOMEventAttr[Symbol.toStringTag] = 'DOMEventAttr'



const getElement = (w, arr, i, v) => (target, type, id) => genElement(type, genAttr(id)(w, genSize(w, arr), i, v)[target])


const updateTexts = (vars, copy) => (d, w) => (num, start, end, target) => 
{
    const _ = copy(vars)
    const g = _.initSVG['g']

    while (g.firstChild)
    {
        g.removeChild(g.firstChild)
    }

    /**
     * 하단의 genSvgFromList 함수를 사용하여, 
     * 복수사용 svg 리스트에 있는 요소들을 생성해준다.
     * setSvgId를 사용하여 우선 svgDefinition 정보를 갱신해줘야 한다.
     */
    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const createEl = getElement(w, d, i, value)
        const [textId, boxId] = [`text-${value}`, `box-${value}`]
        const [text, box, group] =
            [
                createEl('dataText', 'text', textId),
                createEl('plot', 'circle', boxId),
                createEl('gBox', 'g'),
            ]

        text.textContent = value
        box.setAttribute('id', boxId)
        text.setAttribute('id', textId)

        // if (value === num) box.setAttribute('fill', 'lemonchiffon'), text.setAttribute('fill', 'black')
        // else if (value === start || value === end) box.setAttribute('fill', '#292a38f2')
        // if (target !== 'bs' && value > num) box.setAttribute('stroke', 'lightseagreen')

        group.appendChild(box)
        group.appendChild(text)
        g.appendChild(group)

    }


}

/**
 * @param {*} 여러 함수에서 공통적으로 사용할 함수, 요소, 변수들의 변경사항을 복사
 */
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



const onChangeInput = (vars, copy) => (e) =>
{
    const _ = copy(vars)
    const [wth, main] = [_._id('width'), _._id('main')]
    const w = _.inputData(wth)
    let d = _.inputData(_._id('data-list'))
    const radioNodeList = document.getElementsByName('radio')

    radioNodeList.forEach(n =>
    {
        if (n.checked && n.value === 'false')
        {
            d = Array.from(new Set(d))
        }
    })

    _._id('data-list').value = `${(d)}`

    const { width } = main.getBoundingClientRect()

    if (w > width)
    {
        wth.value = width - 250
        w = width - 250
    }

    const newPath = genPath(genSize(w, d))(d)

    vars = [w, d, ...vars]
    updatePath(_.SVGPathElement, newPath)
    _.updateTexts(vars, copy)(d, w)()

}


const updatePath = (el, d) => el.setAttribute('d', `${d}`)


// const startSimulation = (vars, copy) => (e) =>
// {

//     const _ = copy(vars)
//     const w = _.inputData(_._id('width'))
//     const d = _.inputData(_._id('data-list'))
//     const target = _.inputData(_._id('target'))
//     let sortRound = -1
//     _._id('search-answer').innerHTML = `waiting...`
//     _._id('search-count').innerHTML = `0`

// }

const initSVGList = Object.entries(svgDefinition(svgIdList).singleSVG)


const genSvgFromList = (list, purpose,) =>
{
    const w = inputData(_id('width'))
    const d = inputData(_id('data-list'))
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
                    updateAttr(temp, { id: id })
                    const isIdNameSame = name === id
                    const isFirstTwoCharsSame = (name + id)[0] === (name + id)[1]
                    const _name = isIdNameSame ? id : isFirstTwoCharsSame ? id : name + (id[0].toUpperCase() + id.slice(1))
                    createdSVG[_name] = temp
                }
                continue
            }
        }

        temp = getElement(w, d)(info.attr, info.type)
        updateAttr(temp, { id: info.id })
        createdSVG[name] = temp
    }

    // const category =
    // {
    //     svg: createdSVG[svg]
    // }

    createdSVG[Symbol.toStringTag] = 'initSVG'
    // createdSVG[Symbol.toStringTag] = 'initSVG'
    return createdSVG
}


// const append = (svg, svgArea, list) =>
// {
//     for (const [key, el] of Object.entries(list))
//     {
//         if (key === 'svg') svgArea.appendChild(el)
//         else svg.appendChild(el)
//     }
// }

/**
 * @param {*} list 추가할 복수의 svg 요소
 * @param {*} to 타겟이 되는 요소
 */
const appendAll = (list) =>
{
    return {
        to: target =>
        {
            for (const [key, el] of Object.entries(list))
            {
                target.appendChild(el)
            }
        }
    }
}


const addEventsToDOM = (vars, copy, list) =>
{
    console.log(list)
    for (const [target, event] of Object.entries(list))
    {
        if (target === 'start') _id(target).addEventListener(event, startSimulation(vars, copy))
        else if (target === 'radio')
        {
            _name(target).forEach(r => r.addEventListener(event, onChangeInput(vars, copy)))
            continue
        }
        else _id(target).addEventListener(event, onChangeInput(vars, copy))

    }
}



const updateTooltip = (w, d, g) =>
{
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


/**
 * 함수로 분리 필요
 */
const updateIdx = (vars,copy) => (x) =>
{
    const _ = copy(vars)
    console.log('Idx', _)
    console.log('Idx', x)
}


const onMove = (vars,copy) => (e) =>
{
    const _ = copy(vars)
    console.log('onMove',_)
    console.log('onMove', e.clientX)
    // let idx = undefined
    // let value = undefined
    // if (idx !== size.idx(e.clientX))
    // {
    //     // idx = e.clientX
    //     if (value !== undefined)
    //     {
    //         _id(`box-${value}`).setAttribute('fill', 'white')
    //         _id(`text-${value}`).setAttribute('fill', 'white')
    //     }
    //     console.log(e.clientX)
    //     idx = size.idx(e.clientX)
    //     console.log(idx)
    //     value = d[idx]
    //     setAttr(line, getAttrByIdx(w, d, value).moveY)
    // }
    // line2.setAttribute('x1', e.clientX - 160)
    // line2.setAttribute('x2', e.clientX - 160)

}


/**
 *  !!TODO :하드코딩 되어 있는부분 개선 필요
 */


const initParams = [
    inputData,
    _id,
    _name,
    genSize,
    genElement,
    getElement,
    genAttr,
    updateAttr,
    updateIdx,
    onMove,
    onChangeInput,
    // startSimulation,
    updateTexts,
    updateTooltip,
    getAttrByIdx,
    genSvgFromList(initSVGList),
    DOMEventAttr,
    svgIdList,
    appendAll,
    addEventsToDOM
]


const init = (vars, copy) =>
{

    const _ = copy(vars)
    console.log('init',_)
    const d = _.inputData(_._id('data-list'))
    const w = _.inputData(_._id('width'))
    const initData = [0,230,120,-450,-200,1600,0,600,-1500,200,0,-1200,-800,800,0]
    _._id('data-list').value = initData.join(',')
    const size = genSize(w, initData)
    const svgArea = _id('svg-area')
    const svg = _.initSVG['svg']
    // const eventParams = [_.]

    // 초기 생성한 SVG 요소 업데이트 (path)
    _.updateAttr(_.initSVG['path'], {d: genPath(size)(initData)})
    // vars = [path, ...vars]
    svgArea.appendChild(svg)
    delete(_.initSVG['svg'])
    _.appendAll(_.initSVG).to(svg)

    _.addEventsToDOM(vars, copy, _.DOMEventAttr)

    // 이벤트리스너 달아주는 함수에서 처리해야함
    const mouseOn = () => { alert('on!');_.initSVG['svg'].addEventListener('mousemove', _.onMove) }
    const mouseOut = () => { alert('out!');_.initSVG['svg'].removeEventListener('mousemove', _.onMove) }
    // _.initSVG['svg'].addEventListener('mouseenter', mouseOn)
    // _.initSVG['svg'].addEventListener('mouseleave', mouseOut)
    _.updateTooltip(w, initData, _.initSVG['g'])

}
init(initParams, copyParams)
