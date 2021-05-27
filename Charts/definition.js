
import { onChangeLineType, onChangeInput, onSelectPeriod, startStream, onMove } from './event.js'

const svgDefinition = (id) =>
{
    const singleSVG =
    {
        svg:
        {
            type: 'svg',
            attr: 'svg',
            id: id.svg,
            name: id.svg,
        },
        eventArea:
        {
            type: 'rect',
            attr: 'eventArea',
            id: id.eventArea,
            name: 'eventArea',
        },
        lineH:
        {
            type: 'line',
            attr: 'lineH',
            id: id.lineH,
            name: 'line',
        },
        lineV:
        {
            type: 'line',
            attr: 'lineV',
            id: id.lineV,
            name: 'lineV',

        },
        borderLine:
        {
            type: 'line',
            attr: 'borderLine',
            id: id.borderLine,
            name: 'line',

        },
        g:
        {
            type: 'g',
            attr: 'g',
            id: id.g,
            name: 'g'
        },

    }
    singleSVG[Symbol.toStringTag] = 'singleSVG'

    const tooltipGroup =
    {
        label:
        {
            type: 'text',
            attr: 'label',
            id: id.label,
            name: 'label'
        },
        dataText:
        {
            type: 'text',
            attr: 'dataText',
            id: id.dataText,
            name: 'dataText'
        },
        plot:
        {
            type: 'circle',
            attr: 'plot',
            id: id.plot,
            name: 'plot',
        },
        gBox:
        {
            type: 'g',
            attr: 'g',
            id: id.gBox,
            name: 'gBox',
        },

    }
    tooltipGroup[Symbol.toStringTag] = 'tooltipGroup'
    const pathGroup = {
        stop: {
            type: 'stop',
            attr: id.stop,
            id: id.stop,
            name: 'stop'
        },
        linearGradient: {
            type: 'linearGradient',
            attr: 'linearGradient',
            id: id.linearGradient,
            name: 'linearGradient',
        },
        fillG: {
            type: 'g',
            attr: 'fillG',
            id: id.fillG,
            name: 'fillG',
        },
        fillBG: {
            type: 'rect',
            attr: 'fillBG',
            id: id.fillBG,
            name: 'fillBG',
        },
        clipPath: {
            type: 'clipPath',
            attr: 'clipPath',
            id: id.clipPath,
            name: 'clipPath',
        },
        fillPath: {  //d
            type: 'path',
            attr: 'fillPath',
            id: id.fillPath,
            name: 'fillPath',
        },
        defs: {
            id: 'defs',
            type: 'defs',
            attr: 'defs',
            name: 'defs',
        },
        path:
        {
            type: 'path',
            attr: 'path',
            id: id.path,
            name: 'path'
        },
        filter:
                {
            type: 'filter',
            attr: 'filter',
            id: id.filter,
            name: 'filter'
        },
        feGaussianBlur:{
            type: 'feGaussianBlur',
            attr: 'feGaussianBlur',
            id: id.feGaussianBlur,
            name: 'feGaussianBlur'
        },

    }
    pathGroup[Symbol.toStringTag] = 'pathGroup'


    return { singleSVG, tooltipGroup, pathGroup }
}
svgDefinition[Symbol.toStringTag] = 'svgDefinition'


/**
 * 하나의 요소에는 고유한 id값 하나를 가지기에,
 * 해당 요소를 여러개 만들어야 한다면, 복수로 나열해준다.
 */
const svgIdList =
{
    svg: ['svg'],
    eventArea: ['eventArea'],
    fillBG: ['fillBG'],
    lineH: ['lineH'],
    lineV: ['lineV'],
    g: ['g', 'group'],
    path: ['path','pathShadow'],
    borderLine: ['left', 'right'],
    linearGradient: ['fill'],
    clipPath: ['frame'],
    stop: ['stop0','stop1', 'stop2', 'stop3'],
    fillPath: ['fillPath'],
    filter: ['lineShadow'],
    feGaussianBlur: ['blur']
}
svgIdList[Symbol.toStringTag] = 'svgIdList'




/**
 * 추가할 이벤트리스너 정의
 */
const DOMEventAttr = {
    'svg':
        [
            {
                event: 'mouseenter',
                func: undefined,
                isAdded: false,
            },
            {
                event: 'mouseleave',
                func: undefined,
                isAdded: false,

            },
            {
                event: 'click',
                func: onSelectPeriod,
                isAdded: false,

            }
        ],
    'width':
        [
            {
                event: 'input',
                func: onChangeInput,
                isAdded: false,

            },
        ],
    'data-list':
        [
            {
                event: 'input',
                func: onChangeInput,
                isAdded: false,

            },
        ],
    'radio':
        [
            {
                event: 'click',
                func: onChangeLineType,
                isAdded: false,

            }
        ],
    'add':
        [
            {
                event: 'click',
                func: onChangeInput,
                isAdded: false,

            }
        ],
    'stream':
        [
            {
                event: 'click',
                func: startStream,
                isAdded: false,

            }
        ],


}
DOMEventAttr[Symbol.toStringTag] = 'DOMEventAttr'


export { svgDefinition,  svgIdList, DOMEventAttr}