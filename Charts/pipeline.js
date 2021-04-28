

import { genElement, genAttr } from './generate'

const getElement = (w, arr, i, v) => (target, type, id) => genElement(type, genAttr(w, arr, i, v)[target])
// const getElement = (w, arr, i, v) => (target, type, id) => genElement(type, genAttr(id)(w, genSize(w, arr), i, v)[target])



export { getElement }