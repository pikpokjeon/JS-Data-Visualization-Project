
const p = ({ t }) => new Promise((res, rej) =>
    setTimeout(() => { return res(t) }, t))
const aa = []

const [a, b] = [
    async (t) =>
        await p({ t: t * 1000 }),
    (t) => console.log(t, aa)
]

const nums = [1, 2, 3]
nums.forEach(n => aa.push(a(n).then(b)))
// nums.forEach(n => a(a(n)).then(b))

console.log(aa)


Promise.race(aa)