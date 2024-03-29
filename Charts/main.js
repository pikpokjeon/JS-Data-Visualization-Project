// !TODO : dynamically import when this project is ran by parcel
// import 'regenerator-runtime/runtime' // parcel async/await 에러 해결
import { chartStore, inputStore, optionStore, Publish } from './store.js'
import { genAttr, genSize, genPath, genElement, genSvgFromList, genSvgList, genRandomChartData } from './generate.js'
import { updateAttr, updateAll, updatePath, updatePathGroup, updateTexts, updateTooltip, updateDataInputBox, updateTooltipMsg } from './update.js'
import { setEvents, onChangeLineType, onChangeInput, onSelectPeriod, startStream, onMove,resizeChart } from './event.js'
import { svgDefinition, svgIdList, DOMEventAttr } from './definition.js'
import { getElement, pipe } from './pipeline.js'
import { _id, _name, appendAll, inputData, copyParams, getLineType } from './helper.js'



const initSetPathGroup = (props, Use) => (a, d) =>
{
    const _ = Use(props)

    const { lineType, w } = _.inputStore
    const { stop0, stop1, stop2, stop3, fill, fillG, fillBG, frame, fillPath, pathDefs, path, pathShadow, blur, lineShadow } = _.$.initPathSVG

    appendAll({ stop0, stop1, stop2, stop3 }).to(fill)

    props = [...props, w, d]
    updatePathGroup(props, Use)(lineType)(w, d)

    appendAll({ blur }).to(lineShadow)
    appendAll({ fillPath }).to(frame)
    appendAll({ fill, frame, lineShadow }).to(pathDefs)

    updateAll(
        [
            [fillBG, { width: w, y: -100 }],
            [pathShadow, { filter: 'url(#lineShadow)', style: `stroke: #373205, stroke-width:10`, opacity: 1 }]
        ])

    appendAll({ fillBG }).to(fillG)
    appendAll({ pathDefs, fillG, path, pathShadow }).to(_.$.initSVG['group'])

}

const initSVGLists = (idList, list) => list.reduce((obj, cur) =>
{
    const [svgGroup, groupName] = [cur.from, cur.as]

    const initList = genSvgList(`${svgGroup}`).setID(idList)
    initList[Symbol.toStringTag] = groupName

    Object.assign(obj, { [groupName]: initList })

    return obj
}, {})


const initSVGElements = (obj) => Object.entries(obj).reduce((elStore, cur) =>
{
    const [name, list] = [cur[0], cur[1]]
    const { w, d } = inputStore
    const tempEls = genSvgFromList(list, w, d).named(name)
    elStore[Symbol.toStringTag] = '$'

    Object.assign(elStore, { [name]: { ...tempEls } })

    return elStore
}, {})


const initSVGListObj = initSVGLists(svgIdList, [
    {
        from: 'singleSVG',
        as: 'initSVG'
    },
    {
        from: 'pathGroup',
        as: 'initPathSVG'
    },
    {
        from: 'tooltipMsgGroup',
        as: 'msgSVG'
    },

])


const initParams = [
    resizeChart,
    inputData,
    _id,
    _name,
    appendAll,
    genSize,
    genElement,
    getElement,
    genAttr,
    updateAttr,
    updateAll,
    Publish,
    inputStore,
    chartStore,
    optionStore,
    onMove,
    onChangeInput,
    onChangeLineType,
    updatePath,
    updateTexts,
    updateTooltip,
    updateDataInputBox,
    updateTooltipMsg,
    genSvgList,
    genPath,
    initSVGElements(initSVGListObj),
    initSetPathGroup,
    genSvgFromList,
    DOMEventAttr,
    svgDefinition,
    appendAll,
    updatePathGroup,
    setEvents,
    genRandomChartData,
    pipe,
    getLineType
]

const init = (props, Use) =>
{
    const _ = Use(props)

    const resizeChartEvent = resizeChart(props, Use)
    window.addEventListener('resize', resizeChartEvent)

    let { w, d, dLabel } = _.inputStore
    const { lineType } = _.optionStore
    dLabel = d.map((_, i) => 2010 + i)
    Publish(_.inputStore, { w: w, d: d, dLabel: d.map((_, i) => 2010 + i) })


    const [svgArea, svg] = [_id('svg-area'), _.$.initSVG['svg']]

    _id('data-list').value = d.join(',')

    svgArea.appendChild(svg)

    delete (_.$.initSVG['svg'])

    const onMoveprops =
        [
            updateAttr, genSize, genAttr, _id, _.$, _.$.initSVG, _.$.initPathSVG, inputData, setEvents, Publish, chartStore, inputStore, optionStore
        ]

    const mouseOn = () => { svg.addEventListener('mousemove', onMove(onMoveprops, Use)) }
    const mouseOut = () => { svg.removeEventListener('mousemove', onMove(onMoveprops, Use)) }

    _.DOMEventAttr['svg'] = _.DOMEventAttr['svg'].map(e =>
    {
        if (e.event === 'mouseenter') e.func = mouseOn
        if (e.event === 'mouseleave') e.func = mouseOut
        return e
    } )
    

    appendAll(_.$.initSVG).to(svg)
    _.$.initSVG = { svg, ..._.$.initSVG }
    setEvents(props, Use).addAll(_.DOMEventAttr)

    updateTooltip(props, Use)(w, d, dLabel)
    updateTooltipMsg(props, Use)(w, d)
    if (lineType) initSetPathGroup(props, Use)(w, d)


}
init(initParams, copyParams)
