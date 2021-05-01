

const updateAttr = (el, attr = {}) =>
{
    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return el
}

const updateTexts = (props, Use) => (d, w) => (num, start, end, target) => 
{

}

const updatePath = (el, d) => el.setAttribute('d', `${d}`)
const updateChildren =  (el, children = []) =>
{
    if (children === undefined) return el
    if (!Array.isArray(children)) children = [children]
    for (const c of children)
    {
        console.log(el,c)
        // 텍스트 p, span or button
        if (typeof c === 'string') el.appendChild(document.createTextNode(c))
        // c 노드배열
        else if (Array.isArray(c)) updateChildren(el, c)
        // c 노드
        else el.appendChild(c)
    }
    console.log(el)

    return el
}



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
        const tooltipList = _.genSvgList('tooltipGroup')
            .setID(
                {
                    gBox: `data-g-${i}`, label: `label-${i}`, dataText: `data-${i}`, plot: `plot-${i}`
                })

        const { plot, label, gBox, dataText } = _.genSvgFromList(tooltipList, w, d, i, value).named('tooltipSVG')
        const a = _.alias('svg')('g')
        const b = _.alias('svg')('rect')
        // 텍스트 속성과 함께 추가하는 방법?
        // plot 은 요소를 반환하고, 내부속성 설정시 함수로 사용?
        // 요소를 다르게 정의 해보자 - 속성 업데이트 부분에, 텍스트 컨텐츠 설정도 가능하도록.
        // updateChildren(label,'hello')

        label.textContent = dlabel[i]
        dataText.textContent = value

        // 부모 <- 자식 || 자식 -> 부모, 가독성이 더 좋은 쪽은??
        _.appendAll({ label, dataText, plot }).to(gBox)
        // a([label, dataText, plot])
        gBox.appendChild(plot)
        g.appendChild(gBox)



    }
}



export { updateAttr, updateTexts, updatePath, updatePathGroup, updateTooltip }