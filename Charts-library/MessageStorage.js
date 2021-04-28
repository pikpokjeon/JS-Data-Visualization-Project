
const Store = () =>
{
    const store = [
            {
                topic: undefined,
                msg: {},
                subscribers: []
            },
    ]
    const getTopic = f =>( ...arg) => 
    {
        console.log(f,arg,topic)
        return f(store.filter( s => s.topic === arg ))
    } 

//     const notify = (topic) => getTopic((topic = 'cat') => (
// subscribers.reduce( (fs, f) => 
//     )).
//     {
//         f(msg), fs.push(f(msg))
//     },[])
    // const publish = (topic, msg) => getTopic(topic).
    //         Object.assign(Object.assign({}, store._store), msg)
        
    // }
    // const subscribe = (topic,sub) => 
    getTopic((arg = 'cat')  =>( arg.map(e => console.log(e))) )
    
}

Store()