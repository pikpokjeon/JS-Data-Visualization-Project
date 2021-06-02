



import { genElement, genAttr } from './generate.js'

// 함수 파일 이동 해야 함
const getElement = (w, arr, i, v) => (target, type) => genElement(type, genAttr(w, arr, i, v)[target])

const pipe = (initVal, ...fns) => fns.reduce((returned, fn) => fn(returned), initVal)

// 앨리먼트 생성 트리 구조 변경 해보기




export { getElement, pipe }