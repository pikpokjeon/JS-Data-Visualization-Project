

// import allEvents  from './event.js'

const t = ({ ...allEvents }) =>
{
    console.log('allEvents', allEvents)
}

const pipe = (...fns) => (v) => fns.reduce((v, fn) => { return fn(v) }, v)
// const a = ({ n }) => { n: n.n - 5 }
// const b = ({ n }) => { n: n.n + 1 }
// const c = ({ n }) => { n: n.n * 10 }
// let q = pipe(a, b, c)({ n: 10 })
// console.log(q)
const v = ({ nn, obj, arr }) => console.log(nn, obj, arr,)
const dd = (...arr) =>
{
    // if (arr['class']) console.log('aaa')
    // console.log(arr)
    return v(...arr)
}
const obj = { class: 1 }
obj[Symbol.toStringTag] = 'obj'
const arr = ['a', 'b']
arr[Symbol.toStringTag] = 'arr'

const st = {}
const nn = 'aa'
nn[Symbol.toStringTag] = nn
const a = [nn, obj, arr]

const aa = a.reduce((acc, cur) =>
{
    acc[cur[Symbol.toStringTag]] = cur
    return acc
}, st)
// console.log(Object.keys(arr))
// console.log(arr.length)
//참조하고 있어서 업데이트 된다.
console.log('st', st)
dd(st)

const el = (type) =>
{
    type = document.createElementNS('http://www.w3.org/2000/svg', type)
    // return
    return {
        type,
        is: attr =>
        {
            for (const [t, v] of Object.entries(attr))
            {
                type.setAttribute(t, v)
            }
            return type
        },
        has: els =>
        {
            for (const [key, el] of Object.entries(els))
            {
                type.appendChild(el)
            }
        }
    }
}
// const chartStore =
// {
//     lastIdx: -1,
//     x: -1,
//     selectedIdx: {
//         start: -1,
//         end: -1,
//     },
//     selectedStartIdx: -1,
//     selectedEndIdx: -1,
// }
// chartStore[Symbol.toStringTag] = 'chartStore'

// const inputStore =
// {
//     w: -1,
//     d: -1,
// }
// inputStore[Symbol.toStringTag] = 'inputStore'

// const Store = (params) =>
// {
//     const initStore = Object.assign({}, chartStore, inputStore)
//     console.log(initStore)
// }

// Store()
// /**
//  * 
//  * @param {*} store 데이터를 등록 할 대상 객체 
//  * @param {*} obj  등록할 데이터 객체
//  */
// const Publish = (store, obj) =>
// {
//     for (const [key, value] of Array.from(Object.entries(obj)))
//     {
//         Reflect.set(store, key, value)
//     }

// }


// export {t}