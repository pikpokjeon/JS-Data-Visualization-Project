const predefinedData =
    [
        {
            topic: 'userInputs',
            data: {
                w: 1500,
                d: [0, 230],
                lineType: 'default'
            }
        },
        {
            topic: 'chartEvent',
            data: {
                lastIdx: -1,
                selectedIdx: { start: -1, end: -1 }
            }
        }


    ]




const Store = (msg, sub) =>
{
    // 임시 정보 객체 
    const _store = {}

    const set = (data, sub) =>
    {
        if (Array.isArray(data))
        {
            data.reduce((acc, cur) =>
            {
                const temp = {
                    [cur.topic]: {
                        data: { ...cur.data },
                        subs: []
                    }
                }
                Object.assign(acc, Object.assign({}, temp))
                // ack(cur.topic, ...sub)
                return acc
                
            }, _store)
        }
        // const temp = {
        //     [msg.topic]: {
        //         data: { ...msg.data },
        //         subs: []
        //     }
        // }

    }

    set(msg)

    // const ack = (topic, subs) => subs.forEach(s => _store[topic][subs].push(s), s())

    // const update = (topic) => _store[topic][subs]
    // 랜더

    return _store

}

module.exports = { predefinedData, Store }