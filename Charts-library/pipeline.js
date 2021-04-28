

import { genElement, genAttr } from './generate'

const getElement = (w, arr, i, v) => (target, type) => genElement(type, genAttr(w, arr, i, v)[target])


// 앨리먼트 생성 트리 구조 변경 해보기




// export { getElement }