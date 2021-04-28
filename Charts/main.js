// import 'regenerator-runtime/runtime' // parcel async/await 에러 해결
import { chartStore, inputStore, Publish } from './store'
import { genAttr, genSize, genPath, genElement, genSvgFromList, genSvgList } from './generate'
import { updateAttr, updatePath, updatePathGroup, updateTexts, updateTooltip } from './update'
import {  setEvents, onChangeLineType, onChangeInput, onSelectPeriod, startStream, onMove  } from './event'
import { svgDefinition, svgIdList, DOMEventAttr } from './definition'
import { getElement } from './pipeline'
import { _id, _name, appendAll, inputData, copyParams } from './helper'



// const focusSelection = (props, Use) =>
// {
//     const _ = Use(props)
//     const size = _.genSize(inputStore['w'], inputStore['d'])
//     updateAttr(_.initPathSVG['fillBG'], { x: size.x(chartStore['selectedStartIdx']) })
// }



const initSetPathGroup = (props, Use) => (w, d) =>
{
    const _ = Use(props)
    console.log(_)
    const lineType = onChangeLineType(props, Use, 'line')()
    const { stop1, stop2, stop3, fill, fillG, fillBG, frame, fillPath, defs, path } = _.initPathSVG

    appendAll({ stop1, stop2, stop3 }).to(fill)

    props = [...props, w, d]
    updatePathGroup(props, Use)(lineType)

    appendAll({ fillPath }).to(frame)
    appendAll({ fill, frame }).to(defs)
    updateAttr(fillBG, { width: w, y: -100 })

    appendAll({ fillBG }).to(fillG)
    appendAll({ defs, fillG, path }).to(_.initSVG['group'])

}



const initSVGList = genSvgList('singleSVG').setID(svgIdList)
    initSVGList[Symbol.toStringTag] = 'initSVG'

const initPathList = genSvgList('pathGroup').setID(svgIdList)
    initPathList[Symbol.toStringTag] = 'initPathSVG'



const initParams = [
    inputData,
    _id,
    _name,
    appendAll,
    genSize,
    genElement,
    getElement,
    genAttr,
    updateAttr,
    Publish,
    inputStore,
    chartStore,
    onMove,
    onChangeInput,
    onChangeLineType,
    updatePath,
    updateTexts,
    updateTooltip,
    genSvgList,
    genPath,
    genSvgFromList(initSVGList, inputData(_id('width')), inputData(_id('data-list')),).named('initSVG'),
    genSvgFromList(initPathList, inputData(_id('width')), inputData(_id('data-list')),).named('initPathSVG'),
    initSetPathGroup,
    genSvgFromList,
    DOMEventAttr,
    svgDefinition,
    appendAll,
    updatePathGroup,
    setEvents
]


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

    initSetPathGroup(props, Use)(w, initData)
    setEvents(props, Use).addAll(_.DOMEventAttr)
    appendAll(_.initSVG).to(svg)
    _.initSVG = { svg, ..._.initSVG }
    updateTooltip(props, Use)(w, initData, initData.map((_, i) => 2010 + i))


}
init(initParams, copyParams)
