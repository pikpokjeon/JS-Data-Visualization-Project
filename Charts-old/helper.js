


/**
 * DOM Selector
 */
const _id = (id) => document.getElementById(id)
const _name = (name) => document.getElementsByName(name)
const _class = (className, target) => target
    ? target.getElementsByClassName(className) 
    : document.getElementsByClassName(className)

/**
 * Check if its not attribute
 * @param {*} value It could be either attribute or element
 */
const isChildren = (value) =>
    Array.isArray(value)
    || typeof value === 'string'
    || 'nodeName' in value
    || 'tagName' in value
/**
 * Predefined DOM constructor creation helper function
 * It returns an element constructor 
 * ends up creatin elements in the DOM tree
 */
/**
 * 
 * @param {*} type SVG or HTML
 * @param {*} tag 
 * @param {*} defaultProps 
 */
const alias = type => (tag, defaultProps) =>
{
    const cons = (attr, children) =>
    {
        isChildren(attr)
    }
}

const gatherElement = type => (el, children) =>
{
    if (children === undefined) return el
    if (!Array.isArray(children)) children = [children]
    for (const c of children)
    {
        // c is a string content like in p, span or button
        if (typeof c === 'string') el.appendChild(document.createTextNode(c))
        // c is Node arry, recursively adds child nodes
        else if (Array.isArray(c)) withElement(el, c)
        // c is a single Node
        else el.appendChild(c)
    }
    return el
}

/**
 * Pipeline function that
 * creates an actual DOM element
 */

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

export { appendAll, inputData, copyParams,  }