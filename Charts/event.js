// import 'regenerator-runtime/runtime' // parcel async/await 에러 해결

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
    _.updateTooltip(props, Use)(w, d, dLabel)
    return lineType
}


// d 입력배열, w 너비, radio 라인타입 사용자 입력값 업데이트 파이프라인
// 1. 데이터를 전부 가져옴
// 2. 데이터 변경시 업데이트가 이뤄져야 하는 부분 적용
// 3. 스토어에 데이터 업데이트


const onChangeInput = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const [wth, main] = [_._id('width'), _._id('main')]
    let [w, d,] =
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

    _.Publish(_.inputStore, { w, d, d_label })

    if (target === 'add' && !isStreaming) 
    {
        d.push(random), d_label.push(lastLabel)
        memo.push(1), _.Publish(_.chartStore, { memo })
    }

    props = [...props, w, d,]

    const getUnitToShow = (d) =>
    {
        let { memo, unitToshow, unitGap } = _.chartStore
        for (let i = 1; i < d.length; i++)
        {
            if (memo[i] > 0)
            {

                let [x, px] = [size.x(0), size.x(unitToshow)]
                const a = px
                unitGap = Math.abs(px - x)
                if (unitGap > 40) unitToshow -= 1
                unitToshow += 1
                // secountIdx = i
                break
            }
        }
        _.Publish(_.chartStore, { unitToshow, unitGap })
        console.log(unitToshow, memo, unitGap)
        return unitToshow
    }

    getUnitToShow(d)


    // const labelArr = (d, memo, s) =>
    // {
    //     let gap = -1
    //     let unitToshow = 2
    //     let secountIdx = 1
    //     let a = -1
    //     const size = s(w, d)

    //     // unit = unit(d,memo,gap,unitToshow)

    //     for (let i = 1; i < d.length; i++)
    //     {
    //         if (memo[i] > 0)
    //         {

    //             let [x, px] = [size.x(0), size.x(unitToshow)]
    //             a = px
    //             gap = Math.abs(x - px)
    //             if (gap > 40) unitToshow -= 1
    //             unitToshow += 1
    //             secountIdx = i
    //             break
    //         }
    //     }
    // return unit
    // console.log(gap, unitToshow, secountIdx, a)

    // console.log(unitToshow, gap)

    //     return d.map((e, i) =>
    //     {
    //         if (size.unitX < 30)
    //         {
    //             if (i % unitToshow === 0)
    //             {
    //                 memo[i] = 1
    //                 return e
    //             }
    //             else
    //             {
    //                 memo[i] = 0
    //                 return undefined
    //             }
    //         }
    //         else
    //         {
    //             return e
    //         }
    //     })
    // }


    _.updateDataInputBox(props, Use)(d)

    const { width } = main.getBoundingClientRect()

    if (w > width)
    {
        wth.value = width - 250
        w = width - 250
    }

    _.updatePathGroup(props, Use)(lineType)(w, d)
    _.updateTooltip(props, Use)(w, d, d_label)


}



const onSelectPeriod = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const size = _.genSize(_.inputStore['w'], _.inputStore['d'])
    const { lastIdx, selectedStartIdx, selectedEndIdx } = _.chartStore
    if (selectedStartIdx < 0)
    {
        _.Publish(_.chartStore, { selectedStartIdx: lastIdx })
        const x = size.x(lastIdx) - size.unitX

        _.updateAll(
            [
                [_.$.initPathSVG['fillBG'], { x: x }],
                [_.$.initSVG['left'], { x1: x, x2: x }]
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
        const [start, last] = [size.x(selectedStartIdx) - size.unitX, size.idx(e.clientX)]
        const isSelectReverse = last - maxIdx < 0

        _.Publish(_.chartStore, { selectedStartIdx: minIdx, selectedEndIdx: maxIdx })

        _.updateAll(
            [
                [_.$.initPathSVG['fillBG'],
                {
                    x: isSelectReverse
                        ? size.x(last) - size.unitX
                        : start, width: selectedWidth
                }],
                [_.$.initSVG['left'], { x1: start, x2: start }],
                [_.$.initSVG['right'],
                {
                    x1: isSelectReverse
                        ? size.x(last) - size.unitX
                        : start + selectedWidth, x2: isSelectReverse
                            ? size.x(last) - size.unitX
                            : start + selectedWidth
                }]
            ]
        )

    }
    else
    {
        _.Publish(_.chartStore, { selectedEndIdx: -1, selectedStartIdx: -1 })

        _.updateAll(
            [
                [_.$.initPathSVG['fillBG'], { width: _.inputStore['w'], x: 0 }],
                [_.$.initSVG['left'], { x1: -1, x2: -1, }],
                [_.$.initSVG['right'], { x1: -1, x2: -1, }]
            ]
        )
    }
}




const startStream = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const [wth, main] = [_._id('width'), _._id('main')]
    let time = _.inputData(_._id('time'))

    let w = _.inputData(wth)
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
            if (w > width)
            {
                wth.value = width - 250
                w = width - 250
            }
            const random = _.genRandomChartData(size)
            props = [w, temp_d, ...props]
            round += 1
            toDelayUpdate(i, 500, round, random, temp_d, d_memo, d_label, w, props)

        }


    }
    const { isStreaming } = _.chartStore
    if (!isStreaming) stream(time)
    else console.log(_.chartStore)

}


const onMove = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const [w, d] = [_.inputData(_._id('width')), _.inputData(_._id('data-list'))]
    const size = _.genSize(w, d)
    let idx = size.idx(e.clientX)
    let value = d[idx]
    if (idx !== _.chartStore['lastIdx'])
    {
        _.Publish(_.chartStore, { lastIdx: size.idx(e.clientX), x: e.clientX })

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
    _.updateAttr(_.$.initSVG['lineV'], { x1: e.clientX - size.leftMargin, x2: e.clientX - size.leftMargin })

}


export { setEvents, onChangeLineType, onChangeInput, onSelectPeriod, startStream, onMove }