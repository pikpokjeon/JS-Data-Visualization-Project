
const chartStore =
{
    lastIdx: -1,
    x: -1,
    selectedIdx:
    {
        begin: -1,
        end: -1,
    }
}
chartStore[Symbol.toStringTag] = 'chartStore'

export {chartStore}