const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET disabled')
//     }
//     else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site Under Maintenance')
// })

app.use(express.json())

// User
app.use(userRouter)

// Task
app.use(taskRouter)

// Starting Server

app.listen(port, () => {
    console.log('Listening at port:- ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abcdef' }, 'thisismynewtest', { expiresIn: '7 days' })
//     console.log(token)
//     const data = jwt.verify(token, 'thisismynewtest')
//     console.log(data)
// }

// myFunction()