// !TODO : dynamically import when this project is ran by parcel
// import 'regenerator-runtime/runtime' // parcel async/await 에러 해결
import { chartStore, inputStore, Publish } from './store.js'
import { genAttr, genSize, genPath, genElement, genSvgFromList, genSvgList, genRandomChartData } from './generate.js'
import { updateAttr, updateAll, updatePath, updatePathGroup, updateTexts, updateTooltip, updateDataInputBox } from './update.js'
import { setEvents, onChangeLineType, onChangeInput, onSelectPeriod, startStream, onMove } from './event.js'
import { svgDefinition, svgIdList, DOMEventAttr } from './definition.js'
import { getElement, pipe } from './pipeline.js'
import { _id, _name, appendAll, inputData, copyParams, getLineType } from './helper.js'



const initSetPathGroup = (props, Use) => (w, d) =>
{
    const _ = Use(props)
    const { lineType } = _.inputStore
    const { stop0, stop1, stop2, stop3, fill, fillG, fillBG, frame, fillPath, defs, path, pathShadow, blur, lineShadow } = _.$.initPathSVG

    appendAll({ stop0, stop1, stop2, stop3 }).to(fill)

    props = [...props, w, d]
    updatePathGroup(props, Use)(lineType)(w, d)

    // appendTree 를 만들어 구조를 작성해서 확장 하도록
    //      renderTo(_.$.initSVG['group')
    //              .with([_.$.initSVG['group'])),
    //      ]

    appendAll({ blur }).to(lineShadow)
    appendAll({ fillPath }).to(frame)
    appendAll({ fill, frame, lineShadow }).to(defs)

    updateAll(
        [
            [fillBG, { width: w, y: -100 }],
            [pathShadow, { filter: 'url(#lineShadow)', style: `stroke: #373205, stroke-width:10`, opacity: 1 }]
        ])

    appendAll({ fillBG }).to(fillG)
    appendAll({ defs, fillG, path, pathShadow }).to(_.$.initSVG['group'])

}


const initTooltipMsg = (props, Use) => (w, d) =>
{
    const _ = Use(props)
    console.log(_)
    const { avg, avgV, max, maxV, min, minV, per, perV, msgBox, msgGroup } = _.$.msgSVG



    updateAll(
        [
            [avg, { y: 10 }],
            [max, { y: 50 }],
            [min, { y: 90 }],
            [per, { y: 130 }],
            [avgV, { y: 10, x: 80 }],
            [maxV, { y: 50, x: 80 }],
            [minV, { y: 90, x: 80 }],
            [perV, { y: 130, x: 80 }],
        ])

    avg.textContent = 'average'
    max.textContent = 'max'
    min.textContent = 'min'
    per.textContent = 'per'
    avgV.textContent = 'averageV  툴팁메세지로 띄우기 위해 개발 중'
    maxV.textContent = 'maxV'
    minV.textContent = 'minV'
    perV.textContent = 'perV'
    appendAll({ avg, avgV, max, maxV, min, minV, per, perV }).to(msgGroup)
    appendAll({ msgGroup }).to(_.$.initSVG['msgG'])
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

    const tempEls = genSvgFromList(list, inputData(_id('width')), inputData(_id('data-list')),).named(name)
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
    }
])


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
    updateAll,
    Publish,
    inputStore,
    chartStore,
    onMove,
    onChangeInput,
    onChangeLineType,
    updatePath,
    updateTexts,
    updateTooltip,
    updateDataInputBox,
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
    const [d, w] = [inputData(_id('data-list')), inputData(_id('width'))]
    const initData = [0, 230, 120, -450, -200, 1600, 0, 600, -1500, 200, 0, -1200, -800, 800, 0]
    Publish(_.inputStore, { w: w, d: initData, dLabel: initData.map((_, i) => 2010 + i) })


    const [svgArea, svg] = [_id('svg-area'), _.$.initSVG['svg']]

    _id('data-list').value = initData.join(',')

    svgArea.appendChild(svg)

    delete (_.$.initSVG['svg'])

    const onMoveprops =
        [
            updateAttr, genSize, _id, _.$, _.$.initSVG, _.$.initPathSVG, inputData, setEvents, Publish, chartStore, inputStore
        ]

    const mouseOn = () => { svg.addEventListener('mousemove', onMove(onMoveprops, Use)) }
    const mouseOut = () => { svg.removeEventListener('mousemove', onMove(onMoveprops, Use)) }

    _.DOMEventAttr['svg'] = _.DOMEventAttr['svg'].map(e =>
    {
        if (e.event === 'mouseenter') e.func = mouseOn
        if (e.event === 'mouseleave') e.func = mouseOut
        return e
    })

    initSetPathGroup(props, Use)(w, d)
    initTooltipMsg(props, Use)(w, d)
    appendAll(_.$.initSVG).to(svg)
    _.$.initSVG = { svg, ..._.$.initSVG }
    setEvents(props, Use).addAll(_.DOMEventAttr)

    updateTooltip(props, Use)(w, d, d.map((_, i) => 2010 + i))


}
init(initParams, copyParams)
