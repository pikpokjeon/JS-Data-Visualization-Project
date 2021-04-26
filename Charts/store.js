
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

export {chartStore, inputStore}