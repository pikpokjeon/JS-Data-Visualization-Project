// import 'regenerator-runtime/runtime' // parcel async/await 에러 해결

import { updateAll } from "./update.js"

/**
 * @param {*} list DOM에 적용할 DOMEventAttr 리스트
 * @param {*} event 삭제할 이벤트리스너 이름
 * @param {*} target 삭제할 이벤트리스너 대상
 */
const setEvents = (props, Use) =>
{
    const _ = Use(props)

    const addAll = list => Array.from(Object.entries(list))
        .reduce((acc, cur) =>
        {
            const [target, events] = [cur[0], cur[1]]
            const _events = []
            const added = _._name(target)
                .forEach(node => events
                    .forEach(e =>
                    {
                        if (e.func)
                        {
                            node.addEventListener(e.event, e.func(props, Use, target))
                            e.isAdded = true
                        }
                        _events.push({ ...e })
                    }))

            return Object.assign(acc, Object.assign({}, { ...cur }))
        }, { ...list })

    // !! TODO: 이벤트 삭제 부분 구현
    // 이벤트 이름
    const off = event =>
    {
        // 대상
        const from = target =>
        {


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
        return { from }

    }
    return { addAll, off }
}




const onChangeLineType = (props, Use, target) => (e) =>
{
    const _ = Use(props)

    const typeNodeList = _._name('radio')

    const { w, d, dLabel } = _.inputStore

    const lineType = _.getLineType(typeNodeList)
    _.Publish(_.inputStore, { lineType })

    props = [w, d, ...props]

    _.updatePathGroup(props, Use)(lineType)(w, d)
    _.updateTooltip(props, Use)(w, d, d.map((e, i) => 2010 + i))
    return lineType
}


// d 입력배열, w 너비, radio 라인타입 사용자 입력값 업데이트 파이프라인
// 1. 데이터를 전부 가져옴
// 2. 데이터 변경시 업데이트가 이뤄져야 하는 부분 적용
// 3. 스토어에 데이터 업데이트


const onChangeInput = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const { w } = _.inputStore
    const [wth, main] = [_._id('width'), _._id('main')]
    let [a, d,] =
        [_.inputData(wth),
        _.inputData(_._id('data-list')),
        ]

    const { lineType } = _.inputStore
    const { isStreaming } = _.chartStore

    let d_label = _.inputData(_._id('data-list')).map((d, i) => 2010 + i)
    const memo = d.map(e => 1)

    _.Publish(_.chartStore, { memo })

    const size = _.genSize(w, d)
    const random = _.genRandomChartData(size)
    const lastLabel = d_label[d_label.lenght - 1] + 1

    if (target === 'add' && !isStreaming) 
    {
        d.push(Math.floor(random)), d_label.push(lastLabel)
        memo.push(1), _.Publish(_.chartStore, { memo })
        _.Publish(_.inputStore, { w, d, d_label })

    }

    let d_memo = d.map(e => 1)

    // const [prev, cur] = [size.x(0), size.x(1)]

    const gap = (memo) =>
    {
        for (let i = 1; i < memo.length; i++)
        {
            if (memo[i] === 1)
            {
                const [prev, cur] = [size.x(0), size.x(i)]
                return cur - prev
            }
        }
    }
    function unit()
    {
        let count = 1
        for (let i = 1; i < d_memo.length; i++)
        {
            if (gap(d_memo) < 45) count += 1
            else count -= 1
            break
        }
        return count
    }

    console.log(gap(d_memo), unit())

    d_memo = d_memo.reduce((acc, cur, i) =>
    {
        // if (gap(d_memo) > 45) cur = 0

        // else if (i % unit() !== 0)
        // {
        //     cur = 1
        // }
        acc.push(cur)
        return acc

    }, [])
    console.log(d_memo)





    props = [...props, w, d,]
    _.Publish(_.inputStore, { w, d, d_label })

    _.updateDataInputBox(props, Use)(d)
    _.updatePathGroup(props, Use)(lineType)(w, d)
    _.updateTooltip(props, Use)(w, d, d_label)


}

const resizeChart = () =>
{
    const { width } = main.getBoundingClientRect()

}


const onSelectPeriod = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const { w, d } = _.inputStore
    const size = _.genSize(w, d)
    const attr = _.genAttr(w, d)
    const { lastIdx, selectedStartIdx, selectedEndIdx, selectedIdx } = _.chartStore
    const [x, y] = [size.x(lastIdx), size.y(d[lastIdx])]
    const maxY = y + size.msgBox.height + size.data.text.height
    const maxX = y + size.msgBox.width
    const unit = (y / d.length)
    const offsetY = maxY + size.data.text.height * 3 > 750 ? y - unit - size.msgBox.height : y + unit
    const visibility = (v) => ({ style: `visibility: ${v}` })
    if (selectedStartIdx < 0)
    {
        _.Publish(_.chartStore, { selectedStartIdx: lastIdx })
        _.updateAll(
            [
                [_.$.initPathSVG['fillBG'], { x: 0, width: x }],
                [_.$.initSVG['left'], { x1: x, x2: x, style: attr.borderLine.style }],
                [_.$.msgSVG['msgGroup'], { transform: `translate(${x - size.msgBox.width / 2},${offsetY})`, ...visibility('visible') }]
            ])

    }
    else if (selectedEndIdx < 0)
    {

        const [minIdx, maxIdx] =
            [
                Math.min(lastIdx, selectedStartIdx),
                Math.max(lastIdx, selectedStartIdx)
            ]

        const selectedWidth = (size.x(maxIdx) - size.x(minIdx))
        const [start, last] = [size.x(selectedStartIdx), size.idx(e.layerX)]
        const isSelectReverse = last - maxIdx < 0
        const [offsetX, reversedOffsetX] = [start + (selectedWidth / 3), start - (selectedWidth / 2)]

        _.Publish(_.chartStore, { selectedStartIdx: minIdx, selectedEndIdx: maxIdx })

        _.updateAll(
            [
                [_.$.initPathSVG['fillBG'],
                {
                    x: isSelectReverse
                        ? size.x(last)
                        : start, width: selectedWidth
                }],
                [_.$.initSVG['left'], { x1: start, x2: start }],
                [_.$.initSVG['right'],
                {
                    x1: isSelectReverse
                        ? size.x(last)
                        : start + selectedWidth,
                    x2: isSelectReverse
                        ? size.x(last)
                        : start + selectedWidth,
                    style: attr.borderLine.style
                }],
                [_.$.msgSVG['msgGroup'],
                {
                    transform: `translate(${isSelectReverse ? reversedOffsetX : offsetX},${offsetY})`,
                    style: `visibility: visible`
                }
                ]
            ]
        )

    }
    else
    {
        _.Publish(_.chartStore, { selectedEndIdx: -1, selectedStartIdx: -1 })
        const initializeAttr = { x1: -1, x2: -1, style: 'display: none' }
        _.updateAll(
            [
                [_.$.initPathSVG['fillBG'], { width: _.inputStore['w'], x: 0 }],
                [_.$.initSVG['left'], { ...initializeAttr }],
                [_.$.initSVG['right'], { ...initializeAttr }],
                [_.$.msgSVG['msgGroup'], { style: 'visibility: hidden' }]

            ]
        )
    }
}




const startStream = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const [wth, main] = [_._id('width'), _._id('main')]
    let time = _.inputData(_._id('time'))

    let w = _.inputStore.w
    let d = _.inputData(_._id('data-list'))
    let d_memo = d.map(e => 1)
    let d_label = d.map((_, i) => Number(2010) + i)

    const updateBox = ({ i, arr, arr_memo, arr_label, w, props }) => new Promise(res => 
    {
        arr_label.push(arr_label[arr_label.length - 1] + 1)
        arr_label.shift()
        props = [...props, arr]
        _.updateTooltip(props, Use)(w, arr, arr_label)
        return res({ i })
    })

    const checkIfTimeOver = ({ i }) =>
    {
        if (i >= time - 1) _.Publish(_.chartStore, { isStreaming: false })
    }

    const updateTargetToSort = (i, delay, round, random, arr, arr_memo, arr_label, w, props) => new Promise(res => 
    {
        return setTimeout(() =>
        {
            const { lineType } = _.inputStore
            arr.push(random)
            d_memo.push(0)
            arr.shift()
            d_memo.shift()
            props = [...props, arr, w]
            _.updateDataInputBox(props, Use)(arr)
            _.updatePathGroup(props, Use)(lineType)(w, arr)
            res({ i, delay, round, random, arr, d_memo, arr_label, w, props })
        }, delay * ((i + 1)))
    })

    const toDelayUpdate = async (i, delay, round, random, arr, arr_memo, arr_label, w, props) =>
    {
        await updateTargetToSort(i, delay, round, random, arr, arr_memo, arr_label, w, props).then(updateBox).then(checkIfTimeOver)
    }

    const stream = (time) =>
    {
        let temp_d = [...d]
        let round = -1
        const size = _.genSize(w, d)
        _.Publish(_.chartStore, { isStreaming: true })

        for (let i = 0; i < time; i++)
        {
            const random = _.genRandomChartData(size)
            props = [w, temp_d, ...props]
            round += 1
            toDelayUpdate(i, 500, round, random, temp_d, d_memo, d_label, w, props)
        }
    }

    const { isStreaming } = _.chartStore
    if (!isStreaming) stream(time)
}


const onMove = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const [w, d] = [_.inputStore['w'], _.inputData(_._id('data-list'))]
    const size = _.genSize(w, d)
    const attr = _.genAttr(w, d)
    let idx = size.idx(e.layerX)
    let value = d[idx]
    let idxAfter = undefined
    if (idx !== _.chartStore['lastIdx'])
    {
        _.Publish(_.chartStore, { lastIdx: idx, x: e.layerX })
        if (value !== undefined)
        {
            updateAll(
                [
                    [_._id(`plot-${idx}${value}`), { fill: attr.color.purple }],
                    [_._id(`label-${idx}${value}`), { fill: attr.color.purple }],
                    [_._id(`data-${idx}${value}`), { fill: attr.color.purple }],
                ]
            )

        }
        idxAfter = size.idx(e.layerX)
        value = d[idxAfter]

    } else if (idx === idxAfter)
    {
        updateAll(
            [
                [_._id(`plot-${idx}${value}`), { fill: 'white' }],
                [_._id(`label-${idx}${value}`), { fill: 'white' }],
                [_._id(`data-${idx}${value}`), { fill: 'white' }],
            ]
        )
    }
    if (_.optionStore['isFocusLine']) _.updateAttr(_.$.initSVG['lineV'], { x1: e.layerX, x2: e.layerX })
    else _.updateAttr(_.$.initSVG['lineV'], { x1: -1, x2: -1 })

}


const showTooltipMsg = (props, Use) => (e) =>
{
}

const selectOption = (props, Use) => (e) =>
{
    const _ = Use(props)
    const selectedNodes = _._name('checkbox')

    Array.from(selectedNodes).reduce((options, cur) =>
    {
        const name = cur.value.split('-').reduce((words, word, i) =>
        {
            let w = word.split('')
            w[0] = i > 0 ? word[0].toUpperCase() : word[0].toLowerCase()
            words += w.join('')
            return words
        }, '')

        Reflect.set(options, name, cur.checked)
        return options

    }, _.optionStore)

    onMove(props, Use)(e)
    _.updateTooltip(props, Use)(_.inputStore['w'], _.inputStore['d'], _.inputStore['d_label'])
}

export { setEvents, onChangeLineType, onChangeInput, onSelectPeriod, startStream, onMove, showTooltipMsg, selectOption }
