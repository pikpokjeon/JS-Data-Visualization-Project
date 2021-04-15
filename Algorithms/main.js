const elById = (target) => document.getElementById(target)

const inputData = (el) =>
{
    return el.value.indexOf(",") > -1
        ? el.value
            .split(",")
            .map(_ => Number(_)).filter(_ => _)
        : Number(el.value)
}

const genSize = (w, d) =>
{
    const unit = (w + 80 - 80 / d.length) / d.length
    const gap = unit / d
    const box = ((w) / d.length) * d.length > w ? ((w) / d.length) - d.length : ((w) / d.length)
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
    const dataBox = { width: data.box - d / s.unit / d, height: data.box - d / s.unit / d }
    const color = { bg: "black", default: "white", focus: "red", blue: "blue" }
    const style = { line: `stroke: ${color.default}; stroke-width: ${s.line}` }
    const svg = {
        width: w,
        height: h,
        // viewBox: `${m} ${m} ${w} ${h}`,
    }
    const list = {
        g: {width:w},
        gBox: {
            transfrom: `translate(${s.unit*i}, ${h / 2})`,
            // width: dataBox.width,
            // x:50,
            fill: color.blue,
        },
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
            x: (s.unit *i)+ dataBox.width/2,
            y: (h - s.unit)/2,
            fill: color.default,
            "dominant-baseline": "end",
            "text-anchor": "middle",
        },
        dataBox: {
            // transfrom: `translate(${50*i}, 0)`,
            width: dataBox.width ,
            // width: dataBox.width /2 ,
            height: dataBox.height,
            x: (s.unit *i ),
            y: h / 2 - s.unit,
            stroke: color.default,
            "stroke-width": s.line,
            // fill : color.focus
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
        g.removeChild(g.firstChild)
    }
    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const createEl = get(w, d, size, gen, attr, i)
        const [text, box, group] = [
            createEl("dataText", "text"),
            createEl("dataBox", "rect"),
            createEl("gBox", "g"),
        ]
        text.textContent = value
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

// 인풋 입력 업데이트 부
const onChangeInput = (vars, copy) => (e) =>
{
    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))
    _.updateTexts(w, d, _.genSize, _.getElement, _.genElement, _.genAttr)(_.g)
}

/**
 * !TODO: 배열을 이어붙여, 정렬이 되는 과정을 기록한다 -> 에니메이션으로 구현
 */
const startSimulation = (vars, copy) => (e) =>
{
    console.log(e)

    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))
    const updateTexts = (temp_d) => _.updateTexts(w, temp_d, _.genSize, _.getElement, _.genElement, _.genAttr)(_.g)
    let _d = [...d]
    let _d_remain = [...d]
    let _d_counts = {}
    let temp_d = []
    const _d_sorted = []
    for (const num of d)
    {
        if (!_d_counts[num]) _d_counts[num] = 0
        _d_counts[num] += 1
    }

    /**
     * !TODO : 일정시간을 간격으로 정렬 과정이 보이도록 해야함
     */
    const promiseFunc = (arr, delay) => new Promise(res => 
    {
        console.log(arr, delay)
        return setTimeout(() => res(arr), delay)
    })
    const getResolve = arr => updateTexts(arr)


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
            temp_d = (_d_sorted.concat(_d_remain))
            const toDelayUpdate = async (delay, temp) =>
            {
                await promiseFunc(temp, delay).then(getResolve)
            }
            toDelayUpdate(1000, temp_d)
            // console.log(_d)
            // console.log(temp_d)
        }
        console.log(_d_remain.length)

    }
    clearTimeout()
    const _d_s = _d_remain
    console.log(_d_s, _d_remain)




}
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
    group,
    svg,
    line,
]

// 초기 시행 부
const init = (vars, copy) =>
{
    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))
    const onChangeInput = _.onChangeInput(vars, copy)
    const startSimulation = _.startSimulation(vars, copy)
    _.elById("width").addEventListener("input", onChangeInput)
    _.elById("data-list").addEventListener("input", onChangeInput)
    _.elById("start").addEventListener("click", startSimulation)
    _.updateTexts(w, d, _.genSize, _.getElement, _.genElement, _.genAttr)(_.g)
}
init(initParams, copyParams)
// 제너레이터로 svg 지우고 -> 엘레먼트를 추가하는 과정들을 반복해준다.


//시뮬레이션 함수

//시뮬레이션 에니메이션