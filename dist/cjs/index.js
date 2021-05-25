'use strict';

const { pipe } = require('./helper.js');

// import { Store, predefinedData } from './store'

/**
 * 
 * @param {*} msg 개수에 상관없이 [] 배열에 초기에 저장할 객체 전달
 * @param {*} sub 스토어를 구독할 구독자(함수)를 배열에 담아 전달
 */
const Store = (msg, sub) =>
{

    // 메세지 저장 객체
    let _store = {};


    const ack = ({ topics }) =>
    {
        topics.forEach(topic => _store[topic].subs.forEach(s => s(_store[topic].data)));
    };


    const subscribe = ({ topics, sub }) =>
    {
        for (const topic of topics)
        {
            _store[topic].subs.push(...sub);
        }
        return { topics }
    };



    const getData = (store) => (topic) => store[topic].data;

    


    const setData = (msgs, sub) => 
    {
        const topics = msgs.reduce((acc, cur) =>
        {
            const prevStore = _store[cur.topic];

            const temp = {
                [cur.topic]: {
                    data: prevStore ? { ...prevStore['data'], ...cur.data } : { ...cur.data },
                    subs: prevStore ? [...prevStore['subs']] : []
                }
            };

            Object.assign(_store, temp);
            acc.push(cur.topic);

            return acc

        }, []);

        return {topics, sub}
    };
    

    const pubSubPipe = (msgs, subs) => [ pipe( setData(msgs, subs), subscribe, ack ) ];


    return { setData, pubSubPipe, subscribe, ack, getData: getData(_store) }

};



/**
 * Store 생성자를 초기화 때와 분리한다
 * @param {*} msgs 데이터 정보
 * @param {*} subs 데이터를 구독하는 함수
 *   
 */

const store = (msgs, subs) =>
{
    const pubSubStore = Store();
    pubSubStore.pubSubPipe(msgs, subs);

    return pubSubStore

};

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


];

// const main =

// const initStore = store(predefinedData)





// subscriber 함수 전달 테스트 함수
const plus = (params) => console.log(params);
const setTopics = () => 2 + 2;
const testFn = (params) => 3 + 3;

const testSubs = [plus, setTopics];


// 초기 스토어 사전 정의 객체 적용
const initStore = store(predefinedData, testSubs);

// 스토어의 데이터를 업데이트 할 때
initStore.pubSubPipe(
    [
        {
            topic: 'userInputs',
            data: {
                w: 1700,
                lineType: 'curve'
            },
        }], [testFn]);


// 데이터를 가져올 때
const { w, d } = initStore.topic('userInputs');

console.log(w,d);
//# sourceMappingURL=index.js.map
