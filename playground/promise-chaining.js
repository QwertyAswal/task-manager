require('../src/db/mongoose')
const User = require('../src/models/user')

// 60784f10faccdf3776c6e823
// 607844fb10c16e2de63da9f0

// User.findByIdAndUpdate('607844fb10c16e2de63da9f0', { age: 1 })
//     .then((user) => {
//         console.log(user)
//         return User.countDocuments({ age: 1 })
//     }).then((count) => {
//         console.log(count)
//     }).catch((e) => {
//         console.log(e)
//     })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age: age })
//     const count = await User.countDocuments({ age: age })
//     return {
//         user,
//         count
//     }
// }

// updateAgeAndCount('607844fb10c16e2de63da9f0', 1).then((data) => {
//     console.log(data)
// }).catch((e) => {
//     console.log(e)
// })