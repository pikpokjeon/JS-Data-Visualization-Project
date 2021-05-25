
const predefinedData =
[
    {
        topic: 'userInputs',
        data: {
            // [Symbol.toStringTag] : 'userInputs', This will be set when publishing a topic with msgs
            w: 1500,
            d: [0, 230, ],
            d_label: [2010, 2011],
            d_memo: [1, 1],
            lineType: 'default',
        },
        
        subs: []
    },
    {
        topic: 'chartEvent',
        data: {
            // [Symbol.toStringTag] : 'chartEvent',
            lastIdx: -1,
            selectedIdx: { start: -1, end: -1 }

        },
        subs: []

    }


]

export { predefinedData }