
const chartStore =
{
    lastIdx: -1,
    x:-1,
    selectedStartIdx: -1,
    selectedEndIdx: -1,
}
chartStore[Symbol.toStringTag] = 'chartStore'

const inputStore =
{
    w: -1,
    d: -1,
}
inputStore[Symbol.toStringTag] = 'inputStore'



/**
 * 
 * @param {*} store 데이터를 등록 할 대상 객체 
 * @param {*} obj  등록할 데이터 객체
 */
const Publish = (store, obj) =>
{
    for (const [key, value] of Array.from(Object.entries(obj)))
    {
        Reflect.set(store, key, value)
    }

}


export { chartStore, inputStore, Publish }