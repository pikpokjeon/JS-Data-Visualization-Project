const elById = (target) => document.getElementById(target)
const elsByName = (name) => document.getElementsByName(name)
const inputData = (el) =>
{
    return el.value.indexOf(',') > -1
        ? el.value
            .split(',')
            .map(_ => Number(_)).filter(_ => typeof _ === 'number')
        : Number(el.value)
}

const genSize = (w, d) =>
{
    const unit = (w + 80 - 80 / d.length) / d.length
    const gap = unit / d.length
    const box = (((w - unit) / d.length) * d.length) + gap * d.length > w ? ((w - (unit * gap + d.length)) / d.length) : ((w - unit) / d.length) - gap

    return {
        d: d.length,
        gap,
        box,
        unit,
        width: w,
        height: 500,
        margin: 50,
        data: { text: { width: 30, height: 20 }, box },
        line: 1,
    }
}


const genElement = (type, attr) =>
{
    console.log(type,attr)
    type = document.createElementNS('http://www.w3.org/2000/svg', type)
    for (const [t, v] of Object.entries(attr))
    {
        type.setAttributeNS(null, t, v)
    }
    return type

}
const setAttr = (el, attr) =>
{

    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return el
}
/**
 *   요소의 x거리를 알아야 하는 경우에는 i를 인자로 받음
 * */
const genAttr = (w, s, i) =>
{
    // console.log(i)
    const { width, height } = elById('main').getBoundingClientRect()
    const [m, h, data, d] = [s.margin, s.height, s.data, s.d]
    const dataBox = { width: s.box, height: s.box }
    const color = { bg: 'black', default: 'white', focus: 'red', blue: 'blue' }
    const style = { line: `stroke: ${color.default}; stroke-width: ${s.line}` }
    const svg = {
        width: w,
        height: h,
        style: 'overflow:visible'
    }
    const list = {
        g: { width: w, height: h, style: 'overflow:visible' },
        gBox: {
            fill: color.bg,
        },
        focusLine: {
            'attributeName': 'stroke-width',
            'attributeType': 'XML',
            'values': '6;1;6;1',
            'dur': '2s',
            'repeatCount': '5',
        },
        moveX: {
            x1: ((s.unit * i) - s.gap + s.unit / 2),
            x2: ((s.unit * i) - s.gap + s.unit / 2),
        },
        eventArea: {
            ...svg,
            fill: color.bg,
        },
        indicatorLine: {
            x1: h + m,
            y1: -h,
            x2: h + m,
            y2: h,
            style: style.line,
        },
        line: {
            x1: ((s.unit * i) - s.gap + s.unit / 2),
            y1: -h,
            x2: ((s.unit * i) - s.gap + s.unit / 2),
            y2: h,
            style: style.line,
        },

        dataText: {
            x: ((s.unit * i) - s.gap + s.unit / 2),
            y: (h / 2) - s.gap,
            fill: color.default,
            'dominant-baseline': 'start',
            'text-anchor': 'middle',
        },
        dataBox: {
            width: s.box,
            height: s.box,
            x: ((s.unit * i) + s.gap / 2),
            y: (h / 2) - s.unit / 2,
            stroke: color.default,
            'stroke-width': s.line,
        },

    }
    return { svg, ...list }
}

// TODO: 요소를 생성
const getElement = (w, arr, i) =>(target, type)  => genElement(type, genAttr(w, genSize(w, arr), i)[target])

const getAttrByIdx = (w, d, i) => genAttr(w, genSize(w, d), Number(i))


const w = inputData(elById('width'))
const d = inputData(elById('data-list'))
const textParams = [w, d, genSize, getElement, genElement, genAttr]


const updateTexts = (vars,copy)=> (d) => ( num, start, end, target) => 
{
    const _ = copy(vars)
    const g = _.initSVG['g']
    // const [w, d] = [_.inputData(_.elById('width')), _.inputData(_.elById('data-list'))]
    
    while (g.firstChild)
    {
        g.removeChild(g.firstChild)

    }

    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const createEl = getElement(w,d,i)

        const [text, box, group] =
        [
            createEl('dataText', 'text'),
            createEl('dataBox', 'rect'),
            createEl('gBox', 'g'),
        ]

        text.textContent = value
        box.setAttribute('id', value)
        text.setAttribute('id', value + 'text')

        if (value === num) box.setAttribute('fill', 'purple')
        else if (value === start || value === end) box.setAttribute('fill', 'green')
        if (target !== 'bs' && value > num) box.setAttribute('fill', '#034f84')

        group.appendChild(box)
        group.appendChild(text)
        g.appendChild(group)

    }


}
const defaultParams = [getElement, genAttr, genElement, elById, inputData]
const updateDefault = (vars, copy) =>
{

}

const copyParams = (params) =>
{
    const copied = {}
    for (const variable of (params))
    {
        if (typeof variable === 'number')
        {
            if (!copied['width']) copied['width'] = -1
            copied['width'] = variable
        }
        else if (Array.isArray(variable))
        {
            if (!copied['d']) copied['d'] = []
            copied['d'] = variable
        }
        else if (variable[Symbol.toStringTag])
        {
            copied[variable[Symbol.toStringTag]] = variable
            
        }
        else if (variable.name === undefined)
        {
            copied[variable.tagName] = variable

        }
        else if (typeof variable === 'function')
        {
            copied[variable.name] = variable
        }
    }
    return copied
}

const updateLines = (elById) => (i, target) =>
{

}


/**
 * 데이터 입력시 데이터 업데이트
 */
const onChangeInput = (vars, copy) => (e) =>
{
    const _ = copy(vars)
    const wth = _.elById('width')
    const w = _.inputData(wth)
    const main = _.elById('main')
    let d = _.inputData(_.elById('data-list'))

    const radioNodeList = document.getElementsByName('duplicated')
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
    _.updateDefault(vars, copy)
    _.updateTexts(vars,copy)

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

    _.elById('search-answer').innerHTML = `waiting...`
    _.elById('search-count').innerHTML = `0`

    const updateBox = ({ i, num, arr }) => new Promise(res => 
    {
        _.updateTexts(vars,copy)(arr)(num,i)
        return res({ num, arr })
    })

    const updateLast = ({ num, arr }) =>
    {
        if (arr.indexOf(num) === arr.length - 1)
        {
            _.elById(`${num}`).setAttribute('fill', 'black')
        }
    }

    let _d = [...d]
    let _d_remain = [...d]
    let _d_counts = {}
    let temp_d = [...d]
    const _d_sorted = []
    for (const num of d)
    {
        if (!_d_counts[num]) _d_counts[num] = 0
        _d_counts[num] += 1
    }

    /**
     * !TODO : 일정시간을 간격으로 정렬 과정이 보이도록 해야함
     */
    const updateTargetToSort = (min, i, delay, arr) => new Promise(res => 
    {
        return setTimeout(() =>
        {
            _.elById(`${min}`).setAttribute('fill', 'purple')
            res({ curIdx: i, num: arr[i], delay, arr })
        }, delay * ((i + 1)))
    })

    const toDelayUpdate = async (delay, idx, min, arr) =>
    {
        await updateTargetToSort(min, idx, delay, arr).then(updateBox).then(updateLast)
    }

    /**
     * 이진탐색 조건 1. 정렬이 가능한가? 정렬을 시작
     * 정렬 -> 이진탐색으로 가기위해 동기처리 필요
     */
    const sort = () => new Promise(res =>
    {

        let idxx = -1
        const start = new Date().getTime()
        while (_d_remain.length)
        {
            const min = Math.min.apply(null, _d_remain)
            for (let i = 0; i < _d_counts[min]; i++)
            {

                const idx = _d.indexOf(min)
                const _idx = _d_remain.indexOf(min)
                delete (_d[idx])
                delete (_d_remain[_idx])
                _d = _d.flat()
                _d_remain = _d_remain.flat()
                _d_sorted.push(min)
                toDelayUpdate(100, idxx, min, temp_d)
                temp_d = (_d_sorted.concat(_d_remain))
                idxx += 1
                // toDelayUpdate(500, idxx, min, temp_d)
                console.log(temp_d)

            }

        }
        const end = new Date().getTime()

        console.log(end - start, start, end)
        // return setTimeout(()=> res(0, temp_d,0,temp_d.length-1 ),3000)

    })


    /**
     * 2. 정렬이 된 배열에서 target 을 찾기 위해 재귀를 돈다
     */
    const goBS = async (i, arr, left, right) =>
    {
        return setTimeout(() =>
        {
            console.log(_)
            const mid = Math.floor((left + right) / 2)
            const dirData = { 'mid': mid, 'left': left, 'right': right }
            const focus = _.genElement('animate', _.genAttr(w, d).focusLine)
            const moveLine = (w, d) => target => _.setAttr(_.elById(target[0]), _.getAttrByIdx(w, d, target[1]).moveX)


            _.elById('mid').appendChild(focus)
            _.elById('search-count').innerHTML = `${i}`
            Object.entries(dirData).forEach((v) => moveLine(w, d)(v))
            _.updateTexts(vars,copy)(arr)( arr[mid], arr[left], arr[right], 'bs')

            if (target === arr[left] || target === arr[right] || target === arr[mid])
            {
                _.elById('search-answer').innerHTML = `[${target}] IS FOUND!!!`
                return console.log('found', target)
            }
            if (arr[mid] < target) return goBS(i + 1, arr, mid, right)
            else if (arr[mid] > target) return goBS(i + 1, arr, left, mid)

        }, 3000)

    }

    // sort()
    // clearTimeout()
    const simulation = async () => [
        sort(),
        goBS(0, temp_d, 0, temp_d.length - 1),
    ]
    // goBS(0, temp_d, 0,temp_d.length-1)
    simulation()

}

/**
 * 초기 실행
 */



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
        eventArea:
        {
            type: 'rect',
            attr: 'eventArea',
            id: id.eventArea
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
        }
    }
    return definition
}

const svgIdList =
{
    svg: 'svg',
    eventArea: 'event',
    lines: ['left', 'mid', 'right'],
    g: ['g', 'group']
}

const svgList = Object.entries(svgDefinition(svgIdList))
// const createEl = (w, d) => getElement(w, d, genSize, genElement, genAttr)
const genSvgFromList = (list) =>
{
    const svgL = {}
    list.forEach(e =>
    {
        const name = e[0]
        const info = e[1]
        let temp = undefined

        if (info.id)
        {
            if (Array.isArray(info.id))
            {
                console.log(e)
                for (const id of info.id)
                {
                    temp = getElement(w, d)(info.attr, info.type)
                    setAttr(temp, { id: id })
                    const isIdNameSame = name === id
                    const isFirstTwoCharsSame = (name + id)[0] === (name + id)[1]
                    const _name  = isIdNameSame ? id : isFirstTwoCharsSame ? id : name + (id[0].toUpperCase() + id.slice(1))
                    if (temp !== undefined && !svgL[_name]) svgL[_name] = temp
                }
            }
            else
            {
                temp = getElement(w, d)(info.attr, info.type)
                setAttr(temp, { id: info.id })
            }
        }
        else
        {
            temp = getElement(w, d)(info.attr, info.type)
        }
        if (temp !== undefined && !svgL[name] && !Array.isArray(info.id)) svgL[name] = temp

    })
    svgL[Symbol.toStringTag] = 'initSVG'
    return svgL
}

const initCreatedSvgList = genSvgFromList(svgList)
console.log(initCreatedSvgList)

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
    updateDefault,
    setAttr,
    getAttrByIdx,
    initCreatedSvgList
]


const DOMEventAttr =
{
    'width': 'input',
    'data-list': 'input',
    'start': 'click',
    'radio': 'click'
}

const init = (vars, copy) =>
{
    const _ = copy(vars)
    const d = _.inputData(_.elById('data-list'))
    const radio = _.elsByName('duplicated')
    const svgArea = _.elById('svg-area')
    const svg = _.initSVG['svg']

    const appendedSVG = (svg, list) =>
    {
        const addedSVG = []

        for (const [key,el] of Object.entries(list))
        {
            if (key === 'svg') svgArea.appendChild(el)
            else svg.appendChild(el)    
            addedSVG.push(el)
        }
        return addedSVG
    }

    
    vars = [...appendedSVG(svg,_.initSVG), ...vars, radio]


    const addEventsToDOM = (list) =>
    {
        let eventFunc = undefined

        for (const [target, event] of Object.entries(list))
        {
            if (target === 'start') eventFunc = _.startSimulation(vars, copy)
            else if (target === 'radio')
            {
                _.elsByName(target).forEach(r => r.addEventListener(event,_.onChangeInput(vars, copy)))
                continue
            }
            else eventFunc = _.onChangeInput(vars, copy)
            _.elById(target).addEventListener(event, eventFunc)
        }
    }
    
    addEventsToDOM(DOMEventAttr)
    _.updateTexts(vars,copy)(d)()

}
init(initParams, copyParams)