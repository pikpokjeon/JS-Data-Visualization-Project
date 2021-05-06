const getUnit = (w, d) =>
{
    const unitX = w / d.length
    const gap = unitX / d.length
    const [height, margin] = [350, -50]
    const [maxData, minData] = [Math.max(...Array.from(d)), (Math.min(...Array.from(d)))]
    const MAX = Math.max(maxData, Math.abs(minData))
    const SUM = (maxData + Math.abs(minData))
    const unitY = (height) / MAX
    return {
        unit: {
            x: unitX,
            y: unitY,
            gap,
        },
        size: {
            w,
            h: 700,           
        },
        data: {
            MAX,
            SUM,
        },
        chartData: {
            maxData,
            minData,
        },
        margin: {
            chartMargin: -50,
            left: 155,
            chartLeft: margin
        },
    }
}

const coordinate = (data) =>
{
    const x = (i) => Math.floor(data.unit.x * i)
    const y = (v) => data.chartMargin + ((MAX - v)) * (data.unit.y)
    const idx = (x) => Math.floor(((x) / (data.unit.x + data.unit.gap)))
    const group = ({
        x: (i) =>
        ({
            single: { x: x(i) },
            couple: {
                x1: x(i),
                x2: x(i),
            },
        }),
        y: (v) => ({
            single: {
                y: y(v)
            },
            couple: {
                y1: y(v),
                y2: y(v),
            }
        })
    })
    return { x, y, idx, group }
    }

    const genCoord = (w, d) => coordinate(getUnit(w, d))


    const genPath = (coord) => (d, type) =>
    {
        let prev = []
        const path = d.reduce((acc, cur, i) =>
        {
            const [a, b] = [coord.x(i), coord.y(cur)]
            const midX = (prev[0] + a) / 2
            if (i > 0 && type !== 'default')
            {
                acc += type === "step" ? ` ${midX} ${prev[1]}` : i === 1 ? `C ${midX} ${prev[1]}` : 'S'
                acc += ` ${midX} ${b}`
            }
            acc += ` ${a} ${b}`
            prev = [a, b]
            return acc

        }, 'M')
        return {
            path: path,
            fill: path + ` V 800 H 0Z`
        }
    }


    
    export { getUnit, genCoord, genPath }