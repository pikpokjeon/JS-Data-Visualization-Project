const elementList = ['a', 'defs', 'g', 'svg', 'switch']

const pipe = (initVal, ...fns) =>
    fns.reduce((returned, fn) => fn(returned), initVal)

const appendChildren =
    (el) =>
    (...children) =>
        [...children].reduce((_, child) => el.appendChild(child), el)

const setAttributes = (el) => (attr) =>
    Object.entries(attr).reduce(
        (_, [t, v]) => el.setAttributeNS(null, t, v),
        el
    )

const svgMethods = {
    attr: (el) => (attr) => setAttributes(el)(attr),
    appendAll: (el) => (y) => appendChildren(el)(...y),
}

export const genElement = (type) =>
    document.createElementNS('http://www.w3.org/2000/svg', type)

// export const chain = (type, chains = []) => {
//     if (type === 'string') type = genElement(type)
//     console.log(type)
//     const compute = el => chains.reduce((mem, fn) => {
//         // const userData = fn(fn(mem))
//         // mem = fn(userData)
//         console.log(mem, fn, fn(mem))
//         return fn(mem)
//     }, el);

//     for (const [name, fn] of Object.entries(svgMethods)) {
//         compute[name] = el => {
//             return chain(type, [...chains, fn(el)])
//             console.log(type)
//         }
//     }
//     console.log(chains)

//     return compute

// }

export const $$ = (type, chain = {}) => {
    let el
    if (typeof type === 'string') el = genElement(type)
    else el = type
    console.log(el)
    // const chain = (chains = []) => {
    const compute = Object.entries(chain).reduce((acc, [name, data]) => {
        const [fn, attr] = data
        acc = fn(el)(attr)
        console.log(acc, el, name, fn, attr)

        return acc
    }, el)

    for (const [name, fn] of Object.entries(svgMethods)) {
        compute[name] = (att) => {
            console.log(att, fn, el, name)
            chain[name] = [fn, att]
            const a = fn(el)(att)
            console.log(111111111, a)
            return compute
        }
    }

    // }
    // return chain

    return compute
}

const group = {
    a: {
        type: 'a',
        attr: (obj) => obj,
    },
    defs: {
        type: 'defs',
        attr: (obj) => obj,
    },
    g: {
        type: 'g',
        attr: (obj) => obj,
    },
    svg: {
        type: 'svg',
        attr: (obj) => obj,
    },
    switch: {
        type: 'switch',
        attr: (obj) => obj,
    },
}
