export const appendChildren =
    (el) =>
        (...children) =>
            [ ...children ].reduce((_, child) => el.appendChild(child), el)

export const setAttributes = (el) => (attr) =>
    Object.entries(attr).reduce(
        (_, [ t, v ]) => el.setAttributeNS(null, t, v), el
    )


const svgMethods = {
    attr: (el) => (attr) => setAttributes(el)(attr),
    append: (el) => (y) => appendChildren(el)(...y),
}

export const svgElement = (type) =>
    document.createElementNS('http://www.w3.org/2000/svg', type)

export const genSVG = (type, chain = {}) =>
{
    const el = (typeof type === 'string') ? svgElement(type) : type
    const compute = Object.values(chain).reduce(
        (_, [ fn, data ]) => fn(el)(data), el
    )

    for (const [ name, fn ] of Object.entries(svgMethods))
    {
        compute[ name ] = (att) =>
        {
            chain[ name ] = [ fn, att ]
            fn(el)(att)
            return compute
        }
    }

    return compute
}
