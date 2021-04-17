const elById = (target) => document.getElementById(target)

const inputData = (el) =>
{
    return el.value.indexOf(",") > -1
        ? el.value
            .split(",")
            .map(_ => Number(_)).filter(_ => typeof _ === "number")
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
        line: 2,
    }
}


const genElement = (type, attr) =>
{
    // console.log(type,attr)
    type = document.createElementNS("http://www.w3.org/2000/svg", type)
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
    const color = { bg: "black", default: "white", focus: "red", blue: "blue" }
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
            "attributeName": "stroke-width",
            "attributeType": "XML",
            "values":"6;1;6;1",
            "dur": "2s",
            "repeatCount": "5",
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
            "dominant-baseline": "start",
            "text-anchor": "middle",
        },
        dataBox: {
            width: s.box,
            height: s.box,
            x: ((s.unit * i) + s.gap / 2),
            y: (h / 2) - s.unit / 2,
            stroke: color.default,
            "stroke-width": s.line,
        },

    }
    return { svg, ...list }
}

// TODO: 요소를 생성
const getElement = (w, arr, size, gen, attr, i) => (target, type) =>
    gen(type, attr(w, size(w, arr), i)[target])

const getAttrByIdx = (w,d,i) => genAttr(w, genSize(w, d), Number(i))


const width = inputData(elById("width"))
const d = inputData(elById("data-list"))
const textParams = [width, d, genSize, getElement, genElement, genAttr]


const updateTexts = (w, d, size, get, gen, attr, elById, num, start, end, target) => (g) =>
{

    while (g.firstChild)
    {
        g.removeChild(g.firstChild)

    }
    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const createEl = get(w, d, size, gen, attr, i)
        const [text, box, group, animate] = [
            createEl("dataText", "text"),
            createEl("dataBox", "rect"),
            createEl("gBox", "g"),
        ]

        text.textContent = value
        box.setAttribute('id', value)
        text.setAttribute('id', value + 'text')


        if (value === num)
        {
            box.setAttribute('fill', 'purple')
        }
        else if (value === start || value === end)
        {
            box.setAttribute('fill', 'green')

        }
        if (target !== 'bs' && value > num)
        {
            box.setAttribute('fill', '#034f84')
        }
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
        // console.log(variable)
        if (typeof variable === "number")
        {
            if (!copied['width']) copied['width'] = -1
            copied['width'] = variable
        }
        else if (Array.isArray(variable))
        {
            if (!copied['d']) copied['d'] = []
            copied['d'] = variable
        }
        else if (variable.name === undefined)
        {
            copied[variable.tagName] = variable
        }
        else if (typeof variable === "function")
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
    const wth = _.elById("width")
    const w = _.inputData(wth)
    const main = _.elById("main")
    let d = _.inputData(_.elById("data-list"))

    const radioNodeList = document.getElementsByName('duplicated')
    radioNodeList.forEach(n =>
    {
        if (n.checked && n.value === "false")
        {
            d = Array.from(new Set(d))
        }
    })
    _.elById("data-list").value = `${(d)}`
    const { width } = main.getBoundingClientRect()
    if (w > width)
    {
        wth.value = width - 250
        w = width - 250
    }
    vars = [w, d, ...vars]
    _.updateDefault(vars, copy)
    _.updateTexts(w, d, _.genSize, _.getElement, _.genElement, _.genAttr)(_.g)

}



/**
 * !TODO: 정렬 -> 이진탐색 동기처리 시각화 구현
 */
const startSimulation = (vars, copy) => (e) =>
{


    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))
    const target = _.inputData(_.elById("target"))

    _.elById('search-answer').innerHTML = `waiting...`
    _.elById('search-count').innerHTML = `0`

    const updateTexts = ({ i, num, arr }) => new Promise(res => 
    {
        _.updateTexts(w, arr, _.genSize, _.getElement, _.genElement, _.genAttr, _.elById, num, i)(_.g)
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
        await updateTargetToSort(min, idx, delay, arr).then(updateTexts).then(updateLast)
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
            const midIdx = Math.floor((left + right) / 2)
            const focus = _.genElement('animate', _.genAttr(w, d).focusLine)
            _.elById('mid').appendChild(focus)

            _.setAttr(_.elById('mid'), _.getAttrByIdx(w,d,midIdx).moveX)
            _.setAttr(_.elById('right'), _.getAttrByIdx(w,d,right).moveX)
            _.setAttr(_.elById('left'), _.getAttrByIdx(w, d, left).moveX)
            
            _.elById('search-count').innerHTML = `${i}`
            _.updateTexts(w, arr, _.genSize, _.getElement, _.genElement, _.genAttr, _.elById, arr[midIdx], arr[left], arr[right], 'bs')(_.g)

            if (target === arr[left] || target === arr[right] || target === arr[midIdx])
            {
                _.elById('search-answer').innerHTML = `[${target}] IS FOUND!!!`
                return console.log('found', target)
            }
            if (arr[midIdx] < target) return goBS(i + 1, arr, midIdx, right)
            else if (arr[midIdx] > target) return goBS(i + 1, arr, left, midIdx)

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
const initParams = [
    inputData,
    elById,
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
]

const init = (vars, copy) =>
{
    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))
    const radio = document.getElementsByName('duplicated')

    const svgArea = _.elById('svg-area')
    const createEl = _.getElement(w, d, _.genSize, _.genElement, _.genAttr)

    const svg = createEl("svg", "svg")
    const eventArea = createEl("eventArea", "rect")
    const lineMid = createEl("line", "line")
    const lineLeft = _.getElement(w, d, _.genSize, _.genElement, _.genAttr, 0)("line", "line")
    const lineRight = _.getElement(w, d, _.genSize, _.genElement, _.genAttr, d.length - 1)("line", "line")
    const group = createEl("g", "g")

    const svgEls = [svg, eventArea, lineMid, group, lineLeft, lineRight]

    lineLeft.setAttribute('id', 'left')
    lineRight.setAttribute('id', 'right')
    lineMid.setAttribute('id', 'mid')
    eventArea.setAttribute('id', 'event')
    svgArea.appendChild(svg)
    svg.appendChild(eventArea)
    svg.appendChild(lineMid)
    svg.appendChild(lineLeft)
    svg.appendChild(lineRight)
    svg.appendChild(group)
    vars = [...svgEls, ...vars, radio]

    const onChangeInput = _.onChangeInput(vars, copy)
    const startSimulation = _.startSimulation(vars, copy)
    _.elById("width").addEventListener("input", onChangeInput)

    _.elById("data-list").addEventListener("input", onChangeInput)
    _.elById("start").addEventListener("click", startSimulation)
    _.updateTexts(w, d, _.genSize, _.getElement, _.genElement, _.genAttr, _.elById)(group)
    radio.forEach(r => r.addEventListener("click", onChangeInput))

}
init(initParams, copyParams)