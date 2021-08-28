/**
 * 연속적으로 함수의 반환값을 다음 함수의 인자로 넘겨 한번에 기능들을 실행
 * @param {*} initVal 초기 인자
 * @param  {...any} fns 실행할 함수
 * @returns 마지막 함수 실행 값
 */

const pipe = (initVal, ...fns) =>
    fns.reduce((returned, fn) => fn(returned), initVal)

module.exports = { pipe }
