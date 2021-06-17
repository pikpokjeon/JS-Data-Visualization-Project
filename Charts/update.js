

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
const updatePathGroup = (props, Use) => (lineType) => (w, d) =>
{
    const _ = Use(props)
    const size = _.genSize(w, d)
    const path = _.genPath(d, lineType)(size)
    _.updatePath(_.$.initPathSVG['path'], path.path)
    _.updatePath(_.$.initPathSVG['pathShadow'], path.path)
    _.updatePath(_.$.initPathSVG['fillPath'], path.fill)
}


const updateTooltip = (props, Use) => (w, d, dLabel) =>
{
    const _ = Use(props)
    const g = _.$.initSVG['group']
    const size = _.genSize(w, d)
    while (g.firstChild)
    {
        g.removeChild(g.firstChild)

    }

    /**
     * genSvgFromList 함수를 사용하여, 
     * svg 리스트에 있는 요소들을 생성해준다.
     */
    let prevData = -1
    for (const [i, value] of (Array.from(Object.entries(d))))
    {

        const [t1id, t2id, pid, gid, bid] = ['label', 'data', 'plot', 'g', 'bar'].map(e => `${e}-${i}${value}`)
        const list = _.genSvgList('tooltipGroup').setID({ gBox: gid, label: t1id, dataText: t2id, plot: pid })
        const list2 = _.genSvgList('barGroup').setID({ bar: bid })

        const { plot, label, gBox, dataText } = _.genSvgFromList(list, w, d, i, value).named('tooltipSVG')
        const { bar } = _.genSvgFromList(list2, w, d, i, value).named('barSVG')
        updateAttr(bar, { id: bid })
        label.textContent = dLabel[i]
        dataText.textContent = value

        // const gap = size.y(value) - prevData
        // if (gap > 0) updateAttr(bar, { fill: '#003cff', y: prevData })
        // else updateAttr(bar, { fill: '#ff007bf7' })
        // console.log(gap)
        // if (i > 0)
        // {
        //     updateAttr(bar, { height: Math.abs(gap) })
        //     gBox.appendChild(bar)
        // }
        prevData = size.y(value)


        _.appendAll({ label, dataText, plot }).to(gBox)
        if (!_.optionStore['isTooltip'] && g.firstChild) updateAttr(plot, { style: 'visibility:hidden' })
        else updateAttr(plot, { style: 'visibility:visible' })

        gBox.appendChild(plot)
        g.appendChild(gBox)

    }
}



export { updateAttr, updateAll, updateTexts, updatePath, updatePathGroup, updateTooltip, updateDataInputBox }