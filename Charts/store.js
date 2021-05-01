
const chartStore =
{
    lastIdx: -1,
    x: -1,
    selectedStartIdx: -1,
    selectedEndIdx: -1,
}
chartStore[Symbol.toStringTag] = 'chartStore'

const inputStore =
{
    w: -1,
    d: -1,
    d_label: -1,
}
inputStore[Symbol.toStringTag] = 'inputStore'

const Store = ({ initTopic, initMsg }) =>
{
    const storage = []

    if (initTopic)
    {
        storage.push(
            {
                topic: initTopic,
                msg: initMsg,
                subscribers: [],
            }
        )
    }
    // const publish = ({ topic, msg }) => Array.from(Object.entries(msg))
    //     .reduce((acc, cur, i) =>
    //     {
    //         const [key, value] = [cur[0], cur[1]]
    //         // if (storedMsg.topic === topic)
    //         console.log(cur,acc)
    //     },storage)
    // const find = (arr, f) =>
    // {
    //     const go = (i, arr, target) =>
    //     {
            
    //     }
    // }
    const obj = { ddd: 1, cs: 4, 5: 7 }
    const a = f => (...args) =>
    {
        console.log(f)
        console.log(...args)
        obj = Object.assign(obj, Object.assign({}, f(...args)))
        console.log(obj)
    }
    const [c,s] = [1,2]
    // const set = 
     a((c, { s }) => ({ idx: c, node: s }))
    // console.log(aaaa)



    
    const publish = ({ topic, msg }) =>
    {
        let idx = -1
        const isStoredTopic = storage.some((e, i) => { if (e.topic === topic) return idx = i })

        // console.log(idx,isStoredTopic)
        if (isStoredTopic > -1 )
        {
            // console.log(msg)
        //    Object.assign( storage[idx],msg )
        }

    }
    return { storage, publish }

}
const store = Store({
    initTopic: 'sss',
    initMsg: {a:1,b:2}
})
// store.publish({ topic: 'sss', msg: { a: 1, b: 2 } })
store.publish({ topic: 's234ss', msg: { a: 1, c: 4, 5: 5 } })
store.publish({ topic: 'sss', msg: { ddd: 1, cs: 4, 5: 7 } })
// console.log(store.storage)


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