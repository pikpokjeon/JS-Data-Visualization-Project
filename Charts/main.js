import 'regenerator-runtime/runtime' // parcel async/await 에러 해결
import { chartStore } from './store.js'

const _id = (target) => document.getElementById(target)
const _name = (name) => document.getElementsByName(name)

let inputData = (el) =>
{
    return el.value.indexOf(',') > -1
        ? el.value
            .split(',')
            .map(_ => Number(_))
        : Number(el.value)
}



const genSize = (w, d) =>
{

    const unitX = w / d.length
    const gap = unitX / d.length
    const [height, margin] = [350, -50]
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
        eventArea: { width: w, height: 700 },
        data: { text: { width: 30, height: 20 } },
        line: 1,
        x: i => Math.floor(unitX * i),
        y: v => margin + ((MAX - v)) * (unitY),
        idx: x => Math.floor(((x) / (unitX + gap)))
    }
}


const genAttr = (id) => (w, s, i, v) =>
{
    const d = inputData(_id('data-list'))
    const h = s.eventArea.height
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

        label: {
            x: s.x(i),
            y: h,
            fill: color.default,
            'dominant-baseline': 'start',
            'text-anchor': 'middle',
        },
        dataText: {
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

        }

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
            id: id.svg,
            name: id.svg,
        },
        eventArea:
        {
            type: 'rect',
            attr: 'eventArea',
            id: id.eventArea,
            name: 'eventArea',
        },
        lineH:
        {
            type: 'line',
            attr: 'lineH',
            id: id.lineH,
            name: 'line',
        },
        lineV:
        {
            type: 'line',
            attr: 'lineV',
            id: id.lineV,
            name: 'lineV',

        },
        g:
        {
            type: 'g',
            attr: 'g',
            id: id.g,
            name: 'g'
        },

    }

    const tooltipGroup =
    {
        label:
        {
            type: 'text',
            attr: 'label',
            id: id.label,
            name: 'label'
        },
        dataText:
        {
            type: 'text',
            attr: 'dataText',
            id: id.dataText,
            name: 'dataText'
        },
        plot:
        {
            type: 'circle',
            attr: 'plot',
            id: id.plot,
            name: 'plot',
        },
        gBox:
        {
            type: 'g',
            attr: 'g',
            id: id.gBox,
            name: 'gBox',
        },

    }
    const pathGroup = {
        stop: {
            type: 'stop',
            attr: id.stop,
            id: id.stop,
            name: 'stop'
        },
        linearGradient: {
            type: 'linearGradient',
            attr: 'linearGradient',
            id: id.linearGradient,
            name: 'linearGradient',
        },
        fillG: {
            type: 'g',
            attr: 'fillG',
            id: id.fillG,
            name: 'fillG',
        },
        fillBG: {
            type: 'rect',
            attr: 'fillBG',
            id: id.fillBG,
            name: 'fillBG',
        },
        clipPath: {
            type: 'clipPath',
            attr: 'clipPath',
            id: id.clipPath,
            name: 'clipPath',
        },
        fillPath: {  //d
            type: 'path',
            attr: 'fillPath',
            id: id.fillPath,
            name: 'fillPath',
        },
        defs: {
            type: 'defs',
            attr: 'defs',
            name: 'defs',
        },
        path:
        {
            type: 'path',
            attr: 'path',
            id: id.path,
            name: 'path'
        }

    }

    return { singleSVG, tooltipGroup, pathGroup }
}


/**
 * 하나의 요소에는 고유한 id값 하나를 가지기에,
 * 해당 요소를 여러개 만들어야 한다면, 복수로 나열해준다.
 */
const svgIdList =
{
    svg: ['svg'],
    eventArea: ['eventArea'],
    lineH: ['lineH'],
    lineV: ['lineV'],
    g: ['g', 'group'],
    path: ['path'],
    linearGradient: ['fill'],
    clipPath: ['frame'],
    stop: ['stop1', 'stop2', 'stop3'],
    fillPath: ['fillPath'],
}
svgIdList[Symbol.toStringTag] = 'svgIdList'


const getElement = (w, arr, i, v) => (target, type, id) => genElement(type, genAttr(id)(w, genSize(w, arr), i, v)[target])


const updateTexts = (props, Subscribe) => (d, w) => (num, start, end, target) => 
{
    const _ = Subscribe(props)
    const g = _.initSVG['g']

    while (g.firstChild)
    {
        g.removeChild(g.firstChild)
    }
    console.log('ssssssss')
    /**
     * 하단의 genSvgFromListList 함수를 사용하여, 
     * 복수사용 svg 리스트에 있는 요소들을 생성해준다.
     * setSvgId를 사용하여 우선 svgDefinition 정보를 갱신해줘야 한다.
     */
    for (const [i, value] of (Array.from(Object.entries(d))))
    {


        // if (value === num) box.setAttribute('fill', 'lemonchiffon'), text.setAttribute('fill', 'black')
        // else if (value === start || value === end) box.setAttribute('fill', '#292a38f2')
        // if (target !== 'bs' && value > num) box.setAttribute('stroke', 'lightseagreen')


    }


}

/**
 * @param {*} params 여러 함수에서 공통적으로 사용할 함수, 요소, 변수들의 변경사항을 복사
 */
const Subscribe = (params) =>
{
    const copied = {}
    for (const variable of (params))
    {
        if (typeof variable === 'number') copied['w'] = variable
        else if (Array.isArray(variable)) copied['d'] = variable
        else if (variable[Symbol.toStringTag]) copied[variable[Symbol.toStringTag]] = variable
        else if (variable.name === undefined) copied[variable.tagName] = variable
        else if (typeof variable === 'function') copied[variable.name] = variable
    }
    return copied
}




const onChangeLineType = (props, Subscribe, target) => (e) =>
{
    const _ = Subscribe(props)
    const typeNodeList = _name('radio')
    const [w, d] = [_.inputData(_._id('width')), _.inputData(_._id('data-list'))]
    let _d_label = d.map((_, i) => Number(2010) + i)
    let lineType
    typeNodeList.forEach(n =>
    {
        if (n.checked) lineType = n.value
    })
    props = [w, d, ...props]
    _.updatePathGroup(props, Subscribe)(lineType)
    _.updateTooltip(props, Subscribe)(w, d, _d_label)

    return lineType
}




const onChangeInput = (props, Subscribe, target) => (e) =>
{
    const _ = Subscribe(props)
    const [wth, main] = [_._id('width'), _._id('main')]
    let w = _.inputData(wth)
    let d = _.inputData(_._id('data-list'))
    let d_memo = d.map(e => 1)
    let _d_label = d.map((_, i) => Number(2010) + i)

    const a = _.genSize(w, d).minData - Math.floor(1000 - Math.random() * 1000)
    const b = Math.floor(Math.random() * 1000)
    const random = _.genSize(w, d).maxData + a + b



    if (target === 'add')
    {
        d.push(random)
        d_memo.push(0)
        props = [...props, w, d,]
    }

    const lineType = onChangeLineType(props, Subscribe, target)()

    // const getUnitToShow = (d,memo,gap,unit) =>
    // {
    //     for (let i = 2; i < d.length; i++)
    //     {
    //         if (memo[i] !== undefined)
    //         {
    //             if (gap > 40) unit -= 1
    //             unit += 1
    //             break
    //         }
    //     }
    //     return unit
    // }


    const labelArr = (d, memo, s) =>
    {
        let gap = -1
        let unitToshow = 2
        let secountIdx = 1
        let a = -1
        const size = s(w, d)

        // unit = unit(d,memo,gap,unitToshow)

        for (let i = 1; i < d.length; i++)
        {
            if (memo[i] > 0)
            {

                let [x, px] = [size.x(0), size.x(unitToshow)]
                a = px
                gap = Math.abs(x - px)
                if (gap > 40) unitToshow -= 1
                unitToshow += 1
                secountIdx = i
                break
            }
        }
        // return unit
        // console.log(gap, unitToshow, secountIdx, a)

        // console.log(unitToshow, gap)

        return d.map((e, i) =>
        {
            if (size.unitX < 30)
            {
                if (i % unitToshow === 0)
                {
                    memo[i] = 1
                    return e
                }
                else
                {
                    memo[i] = 0
                    return undefined
                }
            }
            else
            {
                return e
            }
        })
    }


    _._id('data-list').value = `${(d)}`

    const { width } = main.getBoundingClientRect()

    if (w > width)
    {
        wth.value = width - 250
        w = width - 250
    }

    _.updatePathGroup(props, Subscribe)(lineType)
    _.updateTooltip(props, Subscribe)(w, d, _d_label)


}

const onSelectPeriod = (props, Subscribe, target) => (e) =>
{
    const _ = Subscribe(props)
    console.log('click')
    if (chartStore['selectedStartIdx'] < 0)
    {
        Publish(chartStore, { selectedStartIdx: chartStore['lastIdx'] })
        
    } else if (chartStore['selectedEndIdx'] < 0)
    {
        const [minIdx, maxIdx] = [
            Math.min(chartStore['lastIdx'], chartStore['selectedStartIdx']),
            Math.max(chartStore['lastIdx'], chartStore['selectedStartIdx'])]

        Publish(chartStore, {selectedStartIdx: minIdx , selectedEndIdx: maxIdx})
        
    } else
    {
        Publish(chartStore, {selectedEndIdx: -1, selectedStartIdx: -1})
        
    }
    console.log(chartStore)
}


const startStream = (props, Subscribe, target) => (e) =>
{
    const _ = Subscribe(props)
    const [wth, main] = [_._id('width'), _._id('main')]
    let time = _.inputData(_._id('time'))

    let w = _.inputData(wth)
    let d = _.inputData(_._id('data-list'))
    let d_memo = d.map(e => 1)
    let _d_label = d.map((_, i) => Number(2010) + i)

    const updateBox = ({ arr, arr_memo, arr_label, w, props }) => new Promise(res => 
    {
        arr_label.push(arr_label[arr_label.length - 1] + 1)
        arr_label.shift()
        props = [...props, arr]
        _.updateTooltip(props, Subscribe)(w, arr, arr_label)
        console.log(chartStore)
        return res({ arr, arr_memo, arr_label, w, props })
    })




    const updateTargetToSort = (i, delay, round, random, arr, arr_memo, arr_label, w, props) => new Promise(res => 
    {
        return setTimeout(() =>
        {
            const lineType = onChangeLineType(props, Subscribe, target)()
            arr.push(random)
            d_memo.push(0)
            arr.shift()
            d_memo.shift()
            props = [...props, arr, w]
            _.updatePathGroup(props, Subscribe)(lineType)
            time -= 1
            res({ i, delay, round, random, arr, d_memo, arr_label, w, props })
        }, delay * ((i + 1)))
    })

    const toDelayUpdate = async (i, delay, round, random, arr, arr_memo, arr_label, w, props) =>
    {
        await updateTargetToSort(i, delay, round, random, arr, arr_memo, arr_label, w, props).then(updateBox)
    }

    const stream = () =>
    {
        let temp_d = [...d]
        let round = -1
        for (let i = 0; i < time; i++)
        {
            if (w > width)
            {
                wth.value = width - 250
                w = width - 250
            }

            const a = _.genSize(w, temp_d).minData - Math.floor(1000 - Math.random() * 1000)
            const b = Math.floor(Math.random() * 1000)
            const random = (_.genSize(w, temp_d).maxData + a + b) * 1.5
            props = [w, temp_d, ...props]
            toDelayUpdate(i, 500, round, random, temp_d, d_memo, _d_label, w, props)
            round += 1

        }

    }

    stream()
}





const updatePath = (el, d) => el.setAttribute('d', `${d}`)




const updatePathGroup = (props, Subscribe) => (lineType) =>
{
    const _ = Subscribe(props)
    const size = _.genSize(_.w, _.d)
    _.updatePath(_.initPathSVG['path'], _.genPath(_.d, lineType)(size).path)
    _.updatePath(_.initPathSVG['fillPath'], _.genPath(_.d, lineType)(size).fill)
}



const genSvgFromList = (list, d, w, i, v) =>
{
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
 * @param {*} list 추가할 복수의 svg 요소
 * @param {*} target 타겟이 되는 요소
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





/**
 * 추가할 이벤트리스너 정의
 */
const DOMEventAttr = {
    'svg':
        [
            {
                event: 'mouseenter',
                func: undefined,
                isAdded: false,
            },
            {
                event: 'mouseleave',
                func: undefined,
                isAdded: false,

            },
            {
                event: 'click',
                func: onSelectPeriod,
                isAdded: false,

            }
        ],
    'width':
        [
            {
                event: 'input',
                func: onChangeInput,
                isAdded: false,

            },
        ],
    'data-list':
        [
            {
                event: 'input',
                func: onChangeInput,
                isAdded: false,

            },
        ],
    'radio':
        [
            {
                event: 'click',
                func: onChangeLineType,
                isAdded: false,

            }
        ],
    'add':
        [
            {
                event: 'click',
                func: onChangeInput,
                isAdded: false,

            }
        ],
    'stream':
        [
            {
                event: 'click',
                func: startStream,
                isAdded: false,

            }
        ],


}
DOMEventAttr[Symbol.toStringTag] = 'DOMEventAttr'




/**
 * @param {*} list DOM에 적용할 DOMEventAttr 리스트
 * @param {*} event 삭제할 이벤트리스너 이름
 * @param {*} target 삭제할 이벤트리스너 대상
 */
const setEvents = (props, Subscribe) =>
{
    const _ = Subscribe(props)
    return {

        addAll: list =>
        {
            for (const [target, events] of Object.entries(list))
            {
                const targetNodes = _._name(target)
                for (const node of targetNodes)
                {
                    for (const data of (events))
                    {
                        if (data.func !== undefined)
                        {
                            node.addEventListener(data.event, data.func(props, Subscribe, target))
                            data.isAdded = true
                        }

                    }
                }
            }
            // console.log(_.DOMEventAttr)
        },
        // !! TODO: 이벤트 삭제 부분 구현
        // 이벤트 이름
        off: event =>
        {
            return {
                // 대상
                from: target =>
                {

                    console.log(_.DOMEventAttr[target].filter(e => 
                    {
                        if (e[event] === event) return e[func]
                    }))
                    const targetNodes = _._name(target)

                    for (const node of targetNodes)
                    {
                        const targets = _.DOMEventAttr[target].filter(e => e.event === event)
                        for (const tg of (targets))
                        {
                            if (tg.isAdded)
                            {
                                node.removeEventListener(event, tg.func)
                                tg.isAdded = false
                                _.DOMEventAttr = { tg, ..._.DOMEventAttr }
                            }

                        }

                    }

                }
            }

        }
    }
}




const genSvgList = (target) =>
{
    return {
        setID: ids => Object.entries(svgDefinition(ids)[target])
    }
}




const updateTooltip = (props, Subscribe) => (w, d, dlabel) =>
{
    const _ = Subscribe(props)
    const g = _.initSVG['g']

    while (g.firstChild)
    {
        g.removeChild(g.firstChild)
    }

    /**
     * genSvgFromList 함수를 사용하여, 
     * svg 리스트에 있는 요소들을 생성해준다.
     */
    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const [t1id, t2id, pid, gid] = [`t1-${i}${value}`, `t2-${i}${value}`, `p-${i}${value}`, `g-${i}${value}`]

        const list = _.genSvgList('tooltipGroup').setID({ gBox: gid, label: t1id, dataText: t2id, plot: pid })

        const { plot, label, gBox, dataText } = _.genSvgFromList(list, d, w, i, value).named('tooltipSVG')

        label.textContent = dlabel[i]
        dataText.textContent = value

        appendAll({ label, dataText, plot }).to(gBox)

        gBox.appendChild(plot)
        g.appendChild(gBox)

    }
}




/**
 * 
 * @param {*} store 데이터를 등록 할 대상 객체 
 * @param {*} obj  등록할 데이터 객체
 */
const Publish = (store, obj) =>
{
    for (const [key, value] of Array.from(Object.entries(obj)))
    {
        Reflect.set(store, key, value)
    }

}
// Publish(chartStore, { arr: [], idx : idx, id: {first:1000, last:2000},count:1000 })




const onMove = (props, Subscribe) => (e) =>
{
    const _ = Subscribe(props)
    const [w, d] = [_.inputData(_._id('width')), _.inputData(_._id('data-list'))]
    const size = _.genSize(w, d)
    let idx = size.idx(e.clientX)
    let value = d[idx]

    if (idx !== chartStore['lastIdx'])
    {
        Publish(chartStore, { lastIdx: size.idx(e.clientX), x: e.clientX })

        if (value !== undefined)
        {
            // _id(`g-${idx}${value}`).setAttribute('fill', 'red')
            // _id(`p-${idx}${value}`).setAttribute('fill', 'green')
            // _id(`t1-${idx}${value}`).setAttribute('fill', 'red')
            // _id(`t2-${idx}${value}`).setAttribute('fill', 'blue')
        }
        idx = size.idx(e.clientX)
        value = d[idx]
    }
    _.updateAttr(_.initSVG['lineV'], { x1: e.clientX - size.leftMargin, x2: e.clientX - size.leftMargin })

}




const initSetPathGroup = (props, Subscribe) => (w, d) =>
{
    const _ = Subscribe(props)
    const size = genSize(w, d)
    const lineType = onChangeLineType(props, Subscribe, 'line')()
    const { stop1, stop2, stop3, fill, fillG, fillBG, frame, fillPath, defs, path } = _.initPathSVG

    appendAll({ stop1, stop2, stop3 }).to(fill)

    props = [...props, w, d]
    _.updatePathGroup(props, Subscribe)(lineType)

    appendAll({ fillPath }).to(frame)
    appendAll({ fill, frame }).to(defs)
    _.updateAttr(fillBG, { width: w, y: -100 })

    appendAll({ fillBG }).to(fillG)
    appendAll({ defs, fillG, path }).to(_.initSVG['group'])

}



const initSVGList = genSvgList('singleSVG').setID(svgIdList)
const initPathList = genSvgList('pathGroup').setID(svgIdList)



const initParams = [
    inputData,
    _id,
    _name,
    // store,
    genSize,
    genElement,
    getElement,
    genAttr,
    updateAttr,
    Publish,
    chartStore,
    // store,
    // savedChartData,
    onMove,
    onChangeInput,
    onChangeLineType,
    updatePath,
    updateTexts,
    updateTooltip,
    genSvgList,
    genPath,
    genSvgFromList(initSVGList, inputData(_id('data-list')), inputData(_id('width'))).named('initSVG'),
    genSvgFromList(initPathList, inputData(_id('data-list')), inputData(_id('width'))).named('initPathSVG'),
    initSetPathGroup,
    genSvgFromList,
    DOMEventAttr,
    svgDefinition,
    appendAll,
    updatePathGroup,
    setEvents
]


const init = (props, Subscribe) =>
{

    const _ = Subscribe(props)
    const [d, w] = [_.inputData(_._id('data-list')), _.inputData(_._id('width'))]

    const initData = [0, 230, 120, -450, -200, 1600, 0, 600, -1500, 200, 0, -1200, -800, 800, 0]
    const testLabel = d.map((_, i) => 2010 + i)

    const [svgArea, svg] = [_id('svg-area'), _.initSVG['svg']]

    _._id('data-list').value = initData.join(',')
    svgArea.appendChild(svg)

    delete (_.initSVG['svg'])

    const onMoveprops = [_.updateAttr, _.genSize, _._id, _.initSVG, _.inputData, _.setEvents, _.Publish, _.chartStore,]
    const mouseOn = () => { svg.addEventListener('mousemove', _.onMove(onMoveprops, Subscribe)) }
    const mouseOut = () => { svg.removeEventListener('mousemove', _.onMove(onMoveprops, Subscribe)) }

    _.DOMEventAttr['svg'] = _.DOMEventAttr['svg'].map(e =>
    {
        if (e.event === 'mouseenter') e.func = mouseOn
        if (e.event === 'mouseleave') e.func = mouseOut
        return e
    })

    _.initSetPathGroup(props, Subscribe)(w, initData)
    _.setEvents(props, Subscribe).addAll(_.DOMEventAttr)
    _.appendAll(_.initSVG).to(svg)
    _.initSVG = { svg, ..._.initSVG }
    _.updateTooltip(props, Subscribe)(w, initData, initData.map((_, i) => 2010 + i))


}
init(initParams, Subscribe)
