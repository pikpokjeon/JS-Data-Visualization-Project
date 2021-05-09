
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

/**
 * 
 * @param {*} msg 개수에 상관없이 [] 배열에 초기에 저장할 객체 전달
 * @param {*} sub 스토어를 구독할 구독자(함수)를 배열에 담아 전달
 */
const Store = (msg, sub) =>
{

    // 메세지 저장 객체
    const _store = {}



    const ack = ({ topic }) =>
    {
        topic.forEach(topic => _store[topic].subs.forEach(s => s(_store[topic].data)))
    }


    const subscribe = ({ topic, sub }) => new Promise((res) =>
    {
        for (const [topic] of topic)
        {
            _store[topic].subs.push(...sub)
        }
        return res({ topic })
    })



    const subData = (store) => (topic) => store[topic].data

    


    const set = (data, sub) => new Promise((res) => 
    {
        const filterData = data.reduce((acc, cur) =>
        {
            const prevStore = _store[cur.topic] ? _store[cur.topic] : undefined

            const temp = {
                [cur.topic]: {
                    data: prevStore ? { ...prevStore['data'], ...cur.data } : { ...cur.data },
                    subs: prevStore ? [...prevStore['subs']] : []
                }
            }
            Object.assign(_store, temp)
            acc.push(Object.keys(temp))

            return acc

        }, [])

        return res({ topic: filterData, sub })

    }
    )

    const pubSubPipe = async (msg, sub) => [await set(msg, sub).then(subscribe).then(ack)]


    pubSubPipe(msg, sub)


    return { set, pubSubPipe, subscribe, ack, getData: getData(_store) }

}


// subscriber 함수 전달 테스트 함수
const plus = (params) => console.log(params)
const setTopic = () => 2 + 2
const testFn = (params) => 3 + 3

const testSubs = [plus, setTopic]


// 초기 스토어 사전 정의 객체 적용
const initStore = Store(predefinedData, testSubs)

// 스토어의 데이터를 업데이트 할 때
initStore.pubSubPipe(
    [
        {
            topic: 'userInputs',
            data: {
                w: 1700,
                lineType: 'curve'
            },
        }], [testFn])


// 데이터를 가져올 때
const { w, d } = initStore.subData('userInputs')
