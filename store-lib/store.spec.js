// import { Store, predefinedData } from './store'

const predefinedData = [
    {
        topic: 'userInputs',
        data: {
            w: 1500,
            d: [0, 230],
            d_label: [2010, 2011],
            d_memo: [1, 1],
            lineType: 'default',
        },
    },
    {
        topic: 'chartEvent',
        data: {
            lastIdx: -1,
            selectedIdx: { start: -1, end: -1 },
        },
    },
]

const Store = (msg, sub) => {
    // 임시 정보 객체
    const _store = {}

    const set = (data, sub) => {
        const ack = (topic, subs) => {
            console.log(subs)
            Array.from(subs).forEach((s) => _store[topic].subs.push(s), s())
        }
        const update = (topic) => _store[topic][subs]

        if (Array.isArray(data)) {
            data.reduce((acc, cur) => {
                const temp = {
                    [cur.topic]: {
                        data: { ...cur.data },
                        subs: [],
                    },
                }
                Object.assign(acc, Object.assign({}, temp))
                ack(cur.topic, sub)
                return acc
            }, _store)
        }
    }

    set(msg, sub)

    return _store
}

const expectation = {
    userInputs: {
        data: {
            w: 1500,
            d: [0, 230],
            d_label: [2010, 2011],
            d_memo: [1, 1],
            lineType: 'default',
        },
        subs: [],
    },
    chartEvent: {
        data: {
            lastIdx: -1,
            selectedIdx: { start: -1, end: -1 },
        },
        subs: [],
    },
}

// Jest도 써서 테스트 해봐야 함
// 콘솔로그 이제 그만...
describe('store 초기 인자 넘겨줄 때', () => {
    const testSubs = () => {
        const plus = (params) => params.reduce((acc, cur) => acc + cur)
        const setTopic = () => 'topic'
        const obj = [plus, setTopic]
        console.log(obj)
        return obj
    }
    const storeInitSet = Store(predefinedData, testSubs())

    test('Store 초기 정보 설정 검사', () =>
        expect(storeInitSet).toEqual(expectation))
})
