require('../src/db/mongoose')
const Task = require('../src/models/task')

// 60783da50b693f27fd082d8a

// Task.findByIdAndDelete('60783da50b693f27fd082d8a').then((query) => {
//     console.log(query)
//     return Task.countDocuments({ completed: false })
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const deletetaskAndCount = async (id, completed) => {
    const deleted = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: completed })
    return {
        deleted,
        count
    }
}

deletetaskAndCount('6078457268c2eb2e4dde4d48', true).then((data) => {
    console.log(data)
}).catch((e) => {
    console.log(e)
})