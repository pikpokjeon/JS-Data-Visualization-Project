// import { genElement } from "./generate"



const _id = (id) => document.getElementById(id)
const _name = (name) => document.getElementsByName(name)
const _class = (className, target) => target
    ? target.getElementsByClassName(className)
    : document.getElementsByClassName(className)


/**
 * 속성인지 자식요소인지 확인
 * @param {*} value 속성/ 자식요소
 */
const isChildren = (value) =>
    Array.isArray(value)
    || typeof value === 'string'
    || 'nodeName' in value
    || 'tagName' in value


/**
 * Predefined DOM constructor generate helper.
 * 요소생성자 반환
 * 
 * @param {*} type SVG or HTML  S(...), H(...)
 * @param {*} tag DOM 요소 by tag. div, svg
 * @param {*} defaultProps 옵션. ex {class:'main'}
 */
const alias = type => (tag) =>
{

    /**
     * @param {*} attr ex {id: 'bg-shadow'}
     * @param {*} children a HTML/SVG 요소/ 텍스트
     */
    const cons = (attr, children) =>
    {
        //속성이 없는경우 자식으로
        return isChildren(attr)
            ? genElement(tag, {}, attr)
            : genElement(tag, attr, children)
    }
    return cons
}



const updateChildren = type => (el, attr = {}, children = []) =>
{
    if (children === undefined) return el
    if (!Array.isArray(children)) children = [children]
    for (const c of children)
    {
        // 텍스트 p, span or button
        if (typeof c === 'string') el.appendChild(document.createTextNode(c))
        // c 노드배열
        else if (Array.isArray(c)) updateChildren(el, c)
        // c 노드
        else el.appendChild(c)
    }
    return [el, attr, children]
}

const renderAll = (...updates) =>
{

}

/**
 * Pipeline function DOM요소생성
 * type = SVG HTML태그.
 */
const genElement = (type) => (el, attr = {}, children = []) =>
{

    el = type === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', type)
        : document.createElement(tag)
    return isChildren(attr) ? [el, {}, attr] : [el, attr, children]
}

const updateAttr = (el, attr = {}, children = []) =>
{
    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return [el, attr, children]
}


/**
 * @param {*} list 추가할 복수의 svg 요소
 * @param {*} target 타겟이 되는 요소
 */
const appendAll = (list) =>
{
    return {
        to: target =>
        {
            for (const [key, el] of Object.entries(list))
            {
                target.appendChild(el)
            }
        }
    }
}

let inputData = (el) =>
{
    return el.value.indexOf(',') > -1
        ? el.value
            .split(',')
            .map(_ => Number(_))
        : Number(el.value)
}



/**
 * @param {*} params 여러 함수에서 공통적으로 사용할 함수, 요소, 변수들의 변경사항을 복사
 */
const copyParams = (params) =>
{
    const copied = {}
    for (const variable of (params))
    {

        if (typeof variable === 'number') copied['w'] = variable
        else if (Array.isArray(variable)) copied['d'] = variable
        else if (variable[Symbol.toStringTag]) copied[variable[Symbol.toStringTag]] = variable
        else if (variable.name === undefined) copied[variable.tagName] = variable
        else if (typeof variable === 'function') copied[variable.name] = variable
    }
    return copied
}

const getLineType = (nodes) =>
    Array.from(nodes).reduce((checked, cur) => cur.checked ? cur.value : checked, 'default')

export { _id, _name, _class, appendAll, inputData, copyParams, getLineType }
