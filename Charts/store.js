
const store =
{
    lastIdx: -1,
    selectedIdx:
    {
        begin: -1,
        end: -1,
    }
}
store[Symbol.toStringTag] = 'store'

module.exports = {store}