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
        line: 3,
    }
}
3
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
    const { width, height } = elById('main').getBoundingClientRect()
    console.log(width,height)
    const [m, h, data, d] = [s.margin, s.height, s.data, s.d]
    const dataBox = { width: s.box, height: s.box }
    const color = { bg: "black", default: "white", focus: "red", blue: "blue" }
    const style = { line: `stroke: ${color.default}; stroke-width: ${s.line}` }
    const svg = {
        width: w,
        height: h,
        style: 'overflow:visible'
        // viewBox: `${m} ${m} ${w} ${h}`,
    }
    const list = {
        g: { width: w, height: h },
        gBox: {
            // transfrom: `translate(${s.unit}, ${h / 2})`,

            // width: dataBox.width,
            // x:50,
            fill: color.bg,
        },
        animateBox: {
            "attribute-Name": "x",
            "attribute-Type": "XML",
            from: ((s.unit * i) + s.gap / 2),
            to: 0,
            begin: "5s",
            dur: "10s",
            fill: "red",
            "repeat-Count": "indefinite",
        },
        eventArea: {
            ...svg,
            fill: color.bg,
        },
        indicatorLine: {
            x1: h + m,
            y1: -h,
            x2: h + m,
            y2: h ,
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
            // transfrom: `translate(${50*i}, 0)`,
            width: s.box,
            // width: dataBox.width /2 ,
            height: s.box,
            x: ((s.unit * i) + s.gap / 2),
            y: (h / 2) - s.unit / 2,
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
// const createEl = getElement(width, d, genSize, genElement, genAttr)

// const svg = createEl("svg", "svg")
// const eventArea = createEl("eventArea", "rect")

const textParams = [width, d, genSize, getElement, genElement, genAttr]
// elById("svg-area").appendChild(svg)
// svg.appendChild(eventArea)


const updateTexts = (w, d, size, get, gen, attr, elById, num, idxx) => (g) =>
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
            createEl("animateBox", "animate")
        ]

        text.textContent = value
        box.setAttribute('id', value)
        text.setAttribute('id', value + 'text')
        if (value > num)
        {
            box.setAttribute('fill', '#034f84')
        }
        if (value === num)
        {
            box.setAttribute('fill', 'purple')

        }

        group.appendChild(box)
        group.appendChild(text)
        // group.appendChild(animate)
        // group.setAttribute('id', value)


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
        console.log(variable)
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

// 인풋 입력 업데이트 부
const onChangeInput = (vars, copy) => (e) =>
{
    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
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
    _.svg.setAttribute('style', `width: ${w}`)
    _.rect.setAttribute('style', `width: ${w}`)
    const { width } = _.svg.getBoundingClientRect()
    vars = [width, d, ...vars]
    _.updateDefault(vars, copy)
    _.updateTexts(width, d, _.genSize, _.getElement, _.genElement, _.genAttr)(_.g)

}





/**
 * !TODO: 배열을 이어붙여, 정렬이 되는 과정을 기록한다 -> 에니메이션으로 구현
 */
const startSimulation = (vars, copy) => (e) =>
{

    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))
    const d = _.inputData(_.elById("data-list"))

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
    const sort = () =>
    {
        let idxx = -1
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
                toDelayUpdate(500, idxx, min, temp_d)
                temp_d = (_d_sorted.concat(_d_remain))
                idxx += 1
                toDelayUpdate(500, idxx, min, temp_d)

            }

        }
    }
    sort()
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
    updateDefault,
]

// 초기 시행 부
const init = (vars, copy) =>
{
    const _ = copy(vars)
    const w = _.inputData(_.elById("width"))

    const d = _.inputData(_.elById("data-list"))
    const svgArea = _.elById('svg-area')
    const createEl = _.getElement(w, d, _.genSize, _.genElement, _.genAttr)

    const radio = document.getElementsByName('duplicated')
    const svg = createEl("svg", "svg")
    const eventArea = createEl("eventArea", "rect")
    const line = createEl("indicatorLine", "line")
    const group = createEl("g", "g")

    const svgEls = [svg, eventArea, line, group]

    svgArea.appendChild(svg)
    svg.appendChild(eventArea)
    svg.appendChild(line)
    svg.appendChild(group)
    vars = [...svgEls, ...vars,radio]
    // _.updateDefault(vars,copy)

    const onChangeInput = _.onChangeInput(vars, copy)
    const startSimulation = _.startSimulation(vars, copy)
    _.elById("width").addEventListener("input", onChangeInput)
    _.elById("data-list").addEventListener("input", onChangeInput)
    _.elById("start").addEventListener("click", startSimulation)
    radio.forEach(r => r.addEventListener("click", onChangeInput))
    console.log(radio)
    _.updateTexts(w, d, _.genSize, _.getElement, _.genElement, _.genAttr, _.elById)(group)
}
init(initParams, copyParams)
// 제너레이터로 svg 지우고 -> 엘레먼트를 추가하는 과정들을 반복해준다.


//시뮬레이션 함수

//시뮬레이션 에니메이션