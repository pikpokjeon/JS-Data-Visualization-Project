
import {test, setEvents} from './event'
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
    _.updatePath(_.initPathSVG['pathShadow'], path.path)
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


        // 텍스트 속성과 함께 추가하는 방법?
        // plot 은 요소를 반환하고, 내부속성 설정시 함수로 사용?
        // 요소를 다르게 정의 해보자 - 속성 업데이트 부분에, 텍스트 컨텐츠 설정도 가능하도록.

        label.textContent = dlabel[i]
        dataText.textContent = value
        // const test = (props, Use, target) => (e) =>
        // {
        //     console.log(e)
        //     }

            // 부모 <- 자식 || 자식 -> 부모, 가독성이 더 좋은 쪽은??
        _.appendAll({ label, dataText, plot }).to(gBox)
        
        gBox.appendChild(plot)
        g.appendChild(gBox)



    }
}



export { updateAttr, updateTexts, updatePath, updatePathGroup, updateTooltip }