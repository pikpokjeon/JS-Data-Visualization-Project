// import { Store, predefinedData } from './store'
const predefinedData =
    [
        {
            topic: 'userInputs',
            data: {
                w: 1500,
                d: [0, 230],
                d_label: [2010, 2011],
                d_memo: [1, 1],
                lineType: 'default'
            },
            subs: []
        },
        {
            topic: 'chartEvent',
            data: {
                lastIdx: -1,
                selectedIdx: { start: -1, end: -1 }
            },
            subs: []

        }


    ]


const Store = (msg, sub) =>
{
    // 메세지 저장 객체
    const _store = {}


    const ack = ({ subTopic }) =>
    {
        subTopic.forEach( topic => _store[topic].subs.forEach(s => s( _store[topic].data )))
    }


    const subscribe = ({ subTopic, sub }) => new Promise((res) =>
    {
        for (const [topic] of subTopic)
        {
            _store[topic].subs.push(...sub)
        }
        return res({ subTopic })
    })


    const set = (data, sub) => new Promise((res) => 
    {
        const initSetData = data.reduce((acc, cur) =>
        {
            const temp = {
                [cur.topic]: {
                    data: { ...cur.data },
                    subs: []
                }
            }
            Object.assign(_store, Object.assign({}, temp))
            acc.push(Object.keys(temp))
            return acc

        }, [])

        return res({ subTopic: initSetData, sub })

    }
    )
    const pubSubPipe = async (msg, sub) => [await set(msg, sub).then(subscribe).then(ack)]

    pubSubPipe(msg, sub)

}


// subscriber 함수 전달 테스트 함수
const plus = (params) => console.log(params)
const setTopic = () => console.log('topic')
const testSubs = [plus, setTopic]

// 초기 
Store(predefinedData, testSubs)
