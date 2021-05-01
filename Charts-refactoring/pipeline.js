

import { genElement, genAttr } from './generate.js'

// 옮겨야 하는 함수
const getElement = (type) => (w, arr, i, v) => (target, tag) => genElement(type)(tag, genAttr(w, arr, i, v)[target])

const pipe = (...fns) => (v) => fns.reduce((v, fn) => { return fn(v) }, v)


export { getElement }