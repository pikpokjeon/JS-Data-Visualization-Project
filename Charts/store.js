
const chartStore =
{
    lastIdx: -1,
    x: -1,
    selectedStartIdx: -1,
    selectedEndIdx: -1,
    selectedIdx: [-1, -1],
    unitToShow: 1,
    unitGap: -1,
    memo: [],
    isStreaming: false,
}
chartStore[Symbol.toStringTag] = 'chartStore'

const inputStore =
{
    w: 1400,
    d: [0, 230, 120, -450, -200, 1600, 0, 600, -1500, 200, 0, -1200, -800, 800, 0],
    d_label: -1,
    lineType: 'default'
}
inputStore[Symbol.toStringTag] = 'inputStore'

const optionStore =
{
    fullRangeLine: true,
    isFocusLine: true,
    isTooltip: true,
    isTooltipBox: true,
}
optionStore[Symbol.toStringTag] = 'optionStore'


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


export { chartStore, inputStore, optionStore, Publish }