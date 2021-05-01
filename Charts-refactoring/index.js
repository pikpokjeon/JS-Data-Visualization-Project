import { App } from './app.js'
import { Store, inputStore } from './store.js'

const mountSVG = () =>
{
    
}


const init = (props, Use) =>
{
    const _ = Use(props)

    const [d, w] = [inputData(_id('data-list')), inputData(_id('width'))]
    const initData = [0, 230, 120, -450, -200, 1600, 0, 600, -1500, 200, 0, -1200, -800, 800, 0]
    Publish(_.inputStore, { w: w, d: initData, dLabel:initData.map((_, i) => 2010 + i) })


    const [svgArea, svg] = [_id('svg-area'), _.initSVG['svg']]

    _id('data-list').value = initData.join(',')
    svgArea.appendChild(svg)

    delete (_.initSVG['svg'])
    const onMoveprops = [updateAttr, genSize, _id, _.initSVG, _.initPathSVG, inputData, setEvents, Publish, chartStore, inputStore]
    const mouseOn = () => { svg.addEventListener('mousemove', onMove(onMoveprops, Use)) }
    const mouseOut = () => { svg.removeEventListener('mousemove', onMove(onMoveprops, Use)) }

    _.DOMEventAttr['svg'] = _.DOMEventAttr['svg'].map(e =>
    {
        if (e.event === 'mouseenter') e.func = mouseOn
        if (e.event === 'mouseleave') e.func = mouseOut
        return e
    })

    const s = genElement('svg')
    
    initSetPathGroup(props, Use)(w, initData)
    setEvents(props, Use).addAll(_.DOMEventAttr)
    appendAll(_.initSVG).to(svg)
    _.initSVG = { svg, ..._.initSVG }
    updateTooltip(props, Use)(w, initData, initData.map((_, i) => 2010 + i))


}
init(initParams, copyParams)

const store = Store({
    initTopic: 'inputData',
    initMsg: inputStore
})
// 차후에 나머지 DOM요소들을 JS로 생성
