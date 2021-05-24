import { genElement } from "./generate"



const _id = (id) => document.getElementById(id)
const _name = (name) => document.getElementsByName(name)
const _class = (className, target) => target
    ? target.getElementsByClassName(className) 
    : document.getElementsByClassName(className)
const inputData = (el) =>
    el.value.indexOf(',') > -1
        ? el.value
            .split(',')
            .map(_ => Number(_))
        : Number(el.value)




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

const alias = (type) => (tag) =>
{
    // checks if its for html tag or svg element
    
    // assigns attributes, and appends children
    // !! attr could be children when its not assigned
    /**
     * @param {*} attr ex {id: 'bg-shadow'}
     * @param {*} children a HTML/SVG 요소/ 텍스트
     */
    return (attributes = {}, children = []) =>
        isChildren(attributes) 
            ? genElement(type)(tag, {}, attributes)
            : genElement(type)(tag, attributes, children)

    /**
     * Usage : 
     * const S = alias('svg')
     * const svg = S('svg')
     * const leftRect = S('rect')
     * const miniText = S('text')
     * 
     * svg({class:'main-svg'}, [
     *  leftRect({id:'last-rect'}, [
     *      miniText('hello')
     * ])])
     */
}


const updateChildren =  (el, children = []) =>
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

    return el
}



const updateAttr = (el, attr = {}) =>
{
    for (const [t, v] of Object.entries(attr))
    {
        el.setAttribute(t, v)
    }
    return el
}


// 객체 전개연산자로 추가할 때
const appendAll = (children) =>
{
        const to = parent =>
        {
            for (const [key, el] of Object.entries(children))
            {
                parent.appendChild(el)
            }
        }
    return { to }
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


export { alias, appendAll, inputData, copyParams, _id, _name, _class, updateChildren, updateAttr  }