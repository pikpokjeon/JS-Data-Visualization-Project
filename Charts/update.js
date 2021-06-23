

const updateAttr = (el, attr, text) =>
{
    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    if (text) el.textContent = text
    return el
}


const updateAll = (...updates) =>
{
    for (const [el, attr, text] of Array.from(...updates))
    {
        updateAttr(el, attr, text)
    }
}


const updateTexts = (props, Use) => (d, w) => (num, start, end, target) => 
{

}


const updatePath = (el, d) => el.setAttribute('d', `${d}`)


const updateDataInputBox = (props, Use) => (d) => 
{
    const _ = Use(props)
    _._id('data-list').value = `${(d)}`
}


// Pathgroup 배열이나 객체를 넘기도록 변경
const updatePathGroup = (props, Use) => (type) => (w, d) =>
{
    const _ = Use(props)
    const size = _.genSize(w, d)
    const genPath = _.genPath(d, type)(size)
    const { lineType } = _.optionStore
    const { path, pathShadow, fillPath } = _.$.initPathSVG
    _.updatePath(path, genPath.path)
    _.updatePath(pathShadow, genPath.path)
    _.updatePath(fillPath, genPath.fill)
    if (!lineType)
    {
        _.updateAll(
            [
                [path, { style: 'visibility:hidden' }],
                [pathShadow, { style: 'visibility:hidden' }],
                [fillPath, { style: 'visibility:hidden' }],
            ]
        )
    } else
    {
        _.updateAll(
            [
                [path, { style: 'visibility:visible' }],
                [pathShadow, { style: 'visibility:visible' }],
                [fillPath, { style: 'visibility:visible' }],
            ]
        )
    }

}


const updateTooltip = (props, Use) => (w, d, dLabel) =>
{
    const _ = Use(props)
    const g = _.$.initSVG['g']
    const size = _.genSize(w, d)
    const { barType, plotType, barDefault, plotDefault, contrast, volume } = _.optionStore
    const temp = [...d]
    const sorted = temp.sort((a, b) => a - b)
    const data_memo = sorted.reduce((prev, cur, i) =>
    {
        if (i === 0) prev.push(cur)
        else
        {
            for (let idx = i; idx > -1; idx--)
            {
                if (prev[idx] !== null)
                {
                    if (Math.abs(prev[idx] - Math.abs(cur)) < 130) prev[idx] = null
                    // else prev.push(cur)
                    break
                }
            }
        }
        return prev

    }, [...temp])
    console.log(sorted, data_memo)
    while (g.firstChild) g.removeChild(g.firstChild)

    let prevData = -1
    let prevX = -1
    let prevY = -1
    for (const [i, value] of (Array.from(Object.entries(d))))
    {
        const [t1id, t2id, pid, gid, bid] = ['label', 'data', 'plot', 'g', 'bar'].map(e => `${e}-${i}${value}`)
        const list = _.genSvgList('tooltipGroup').setID({ gBox: gid, label: t1id, dataText: t2id, plot: pid })
        const list2 = _.genSvgList('barGroup').setID({ bar: bid })

        const { plot, label, gBox, dataText } = _.genSvgFromList(list, w, d, i, value).named('tooltipSVG')
        const { bar } = _.genSvgFromList(list2, w, d, i, value).named('barSVG')
        updateAttr(bar, { id: bid })
        label.textContent = dLabel[i]
        // if (data_memo.includes(value))
        dataText.textContent = value

        const gap = size.y(value) - prevData

        if (barType)
        {
            if (gap > 0) updateAttr(bar, { fill: '#003cff', y: prevData })
            else updateAttr(bar, { fill: '#ff007bf7' })

            if (i > 0 && contrast)
            {
                updateAttr(bar, { height: Math.abs(gap) })
            }
            else if (i > 0 && barDefault)
            {
                const h = Math.abs(gap)
                updateAttr(bar, { width: size.gap * 7, height: h, y: 700 - h, x: size.x(i) - (size.gap * 3.5) })
            }
            gBox.appendChild(bar)

        }
        if (plotType)
        {
            if (volume)
            {
                const max = size.y(size.MAX)
                const unit = Math.abs(max - ((size.y(value)) / 10))

                console.log(unit)
                updateAttr(plot, { r: unit * unit / max })
            }
        }
        prevData = size.y(value)


        _.appendAll({ label, dataText, plot }).to(gBox)
        if (!_.optionStore['isTooltip'] && g.firstChild) updateAttr(plot, { style: 'visibility:hidden' })
        else updateAttr(plot, { style: 'visibility:visible' })

        gBox.appendChild(plot)
        g.appendChild(gBox)

    }
}

const updateTooltipMsg = (props, Use) => (w, d) =>
{
    const _ = Use(props)
    console.log(_)
    const { msgBlur, msgDefs, msgFilter } = _.$.initPathSVG
    const { avg, avgV, max, maxV, min, minV, per, perV, msgBox, msgShadow, msgGroup } = _.$.msgSVG
    _.updateAll(
        [
            [avg, { y: 30 }, 'average'],
            [max, { y: 60 }, 'max'],
            [min, { y: 90 }, 'min'],
            [per, { y: 120 }, 'per'],
            [avgV, { y: 30, x: 110 }, 'averageV '],
            [maxV, { y: 60, x: 110 }, 'maxV'],
            [minV, { y: 90, x: 110 }, 'minV'],
            [perV, { y: 120, x: 110 }, 'perV'],
        ])
    _.updateAll(
        [
            [msgFilter, { width: 200, height: 200 }],

            [msgBlur, { stdDeviation: '10' }]
        ]
    )

    _.appendAll({ msgBlur }).to(msgFilter)
    _.appendAll({ msgFilter }).to(msgDefs)
    _.appendAll({ msgBox, msgShadow, avg, avgV, max, maxV, min, minV, per, perV, }).to(msgGroup)
    _.appendAll({ msgDefs, msgGroup }).to(_.$.initSVG['msgG'])
}



export { updateAttr, updateAll, updateTexts, updatePath, updatePathGroup, updateTooltip, updateDataInputBox, updateTooltipMsg }