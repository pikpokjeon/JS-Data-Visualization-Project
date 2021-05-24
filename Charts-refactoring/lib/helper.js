
const pipe = ( initVal, ...fns) => fns.reduce( (returned, fn ) => fn(returned), initVal)

export { pipe }