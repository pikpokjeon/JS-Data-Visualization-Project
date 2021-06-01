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
        .reduce( (acc, cur) =>
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
                    _events.push({...e})
                }))
            return Object.assign(acc, Object.assign({}, {...cur}))
        }, {...list})

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


const getLineType = (nodes) => 
    Array.from(nodes).reduce((checked, cur) =>  cur.checked ? cur.value : checked , 'default')


const onChangeLineType = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    
    const typeNodeList = _._name('radio')
    
    const { w, d, dLabel } = _.inputStore

    const lineType  = getLineType(typeNodeList)
    
    props = [w, d, ...props]
    
    _.updatePathGroup(props, Use)(lineType)
    _.updateTooltip(props, Use)(w, d, dLabel )
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
    let [w, d, d_label] =
        [_.inputData(wth),
         _.inputData(_._id('data-list')),
         _.inputData(_._id('data-list')).map((d,i) => 2010 + i)]
    let d_memo = d.map(e => 1)

    const a = _.genSize(w, d).minData - Math.floor(1000 - Math.random() * 1000)
    const b = Math.floor(Math.random() * 1000)
    const random = _.genSize(w, d).maxData + a + b


    _.Publish(_.inputStore, { w, d, d_label })

    if (target === 'add')
    {
        d.push(random)
        d_memo.push(0)
        props = [...props, w, d,]
    }

    const lineType = onChangeLineType(props, Use, target)()

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


    _._id('data-list').value = `${(d)}`

    const { width } = main.getBoundingClientRect()

    if (w > width)
    {
        wth.value = width - 250
        w = width - 250
    }

    _.updatePathGroup(props, Use)(lineType)
    _.updateTooltip(props, Use)(w, d, d_label )


}



const onSelectPeriod = (props, Use, target) => (e) =>
{
    const _ = Use(props)
    const size = _.genSize(_.inputStore['w'], _.inputStore['d'])
    const {lastIdx, selectedStartIdx, selectedEndIdx } = _.chartStore
    if (selectedStartIdx < 0)
    {
        _.Publish(_.chartStore, { selectedStartIdx: lastIdx })
        const x = size.x(lastIdx) - size.unitX
        _.updateAttr(_.$.initPathSVG['fillBG'], { x: x })
        _.updateAttr(_.$.initSVG['left'], { x1: x, x2: x })

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

        _.updateAttr(_.$.initPathSVG['fillBG'],
        {
            x: isSelectReverse
                ? size.x(last) - size.unitX
                : start, width: selectedWidth
        })
        _.updateAttr(_.$.initSVG['left'], { x1: start, x2: start })
        _.updateAttr(_.$.initSVG['right'],
        {
            x1: isSelectReverse
                ? size.x(last) - size.unitX
                : start + selectedWidth, x2: isSelectReverse
                ? size.x(last) - size.unitX
                : start + selectedWidth
        })


    }
    else
    {
        _.Publish(_.chartStore, { selectedEndIdx: -1, selectedStartIdx: -1 })
        _.updateAttr(_.$.initPathSVG['fillBG'], { width: _.inputStore['w'], x: 0 })
        _.updateAttr(_.$.initSVG['left'], { x1: -1, x2: -1, })
        _.updateAttr(_.$.initSVG['right'], { x1: -1, x2: -1, })


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

    const updateBox = ({ arr, arr_memo, arr_label, w, props }) => new Promise(res => 
    {
        arr_label.push(arr_label[arr_label.length - 1] + 1)
        arr_label.shift()
        props = [...props, arr]
        _.updateTooltip(props, Use)(w, arr, arr_label)
        return res({ arr, arr_memo, arr_label, w, props })
    })




    const updateTargetToSort = (i, delay, round, random, arr, arr_memo, arr_label, w, props) => new Promise(res => 
    {
        return setTimeout(() =>
        {
            const lineType = _.onChangeLineType(props, Use, target)()
            arr.push(random)
            d_memo.push(0)
            arr.shift()
            d_memo.shift()
            props = [...props, arr, w]
            _.updatePathGroup(props, Use)(lineType)
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
            toDelayUpdate(i, 500, round, random, temp_d, d_memo, d_label , w, props)
            round += 1

        }

    }

    stream()
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