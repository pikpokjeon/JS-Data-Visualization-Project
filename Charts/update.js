

const updateAttr = (el, attr) =>
{
    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return el
}

const updateTexts = (props, Use) => (d, w) => (num, start, end, target) => 
{
//     const _ = Use(props)
//     const g = _.initSVG['g']

//     while (g.firstChild)
//     {
//         g.removeChild(g.firstChild)
//     }
//     /**
//      * 하단의 genSvgFromListList 함수를 사용하여, 
//      * 복수사용 svg 리스트에 있는 요소들을 생성해준다.
//      * setSvgId를 사용하여 우선 svgDefinition 정보를 갱신해줘야 한다.
//      */
//     for (const [i, value] of (Array.from(Object.entries(d))))
//     {
//         // if (value === num) box.setAttribute('fill', 'lemonchiffon'), text.setAttribute('fill', 'black')
//         // else if (value === start || value === end) box.setAttribute('fill', '#292a38f2')
//         // if (target !== 'bs' && value > num) box.setAttribute('stroke', 'lightseagreen')

//     }
}

const updatePath = (el, d) => el.setAttribute('d', `${d}`)



// Pathgroup 배열이나 객체를 넘기도록 변경
const updatePathGroup = (props, Use) => (lineType) =>
{
    const _ = Use(props)
    const size = _.genSize(_.w, _.d)
    const path = _.genPath(_.d, lineType)(size)
    _.updatePath(_.initPathSVG['path'], path.path)
    _.updatePath(_.initPathSVG['fillPath'], path.fill)
}



const updateTooltip = (props, Use) => (w, d, dlabel) =>
{
    const _ = Use(props)
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
        const [t1id, t2id, pid, gid] = ['t1','t2','p','g'].map(e =>  `${e}-${i}${value}`)

        const list = _.genSvgList('tooltipGroup').setID({ gBox: gid, label: t1id, dataText: t2id, plot: pid })

        const { plot, label, gBox, dataText } = _.genSvgFromList(list, w, d, i, value).named('tooltipSVG')

        label.textContent = dlabel[i]
        dataText.textContent = value
        _.appendAll({ label, dataText, plot }).to(gBox)

        gBox.appendChild(plot)
        g.appendChild(gBox)

    }
}



export { updateAttr, updateTexts, updatePath, updatePathGroup, updateTooltip }