

const updateAttr = (el, attr) =>
{
    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return el
}


const updateAll = (...updates) =>
{
    for (const [el, attr] of Array.from(...updates))
    {
       updateAttr(el,attr)
    }
}


const updateTexts = (props, Use) => (d, w) => (num, start, end, target) => 
{

}


const updatePath = (el, d) => el.setAttribute('d', `${d}`)


const updateDataInputBox = (props, Use) =>  (d) => 
{
    const _ = Use(props)
    _._id('data-list').value = `${(d)}`
}


// Pathgroup 배열이나 객체를 넘기도록 변경
const updatePathGroup = (props, Use) => (lineType) => (w,d) =>
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
    const g = _.$.initSVG['g']

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
        const [t1id, t2id, pid, gid] = ['t1','t2','p','g'].map(e =>  `${e}-${i}${value}`)

        const list = _.genSvgList('tooltipGroup').setID({ gBox: gid, label: t1id, dataText: t2id, plot: pid })

        const { plot, label, gBox, dataText } = _.genSvgFromList(list, w, d, i, value).named('tooltipSVG')

        label.textContent = dLabel[i]
        dataText.textContent = value
        _.appendAll({ label, dataText, plot }).to(gBox)

        gBox.appendChild(plot)
        g.appendChild(gBox)

    }
}



export { updateAttr, updateAll, updateTexts, updatePath, updatePathGroup, updateTooltip, updateDataInputBox }