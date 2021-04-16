const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// User
app.use(userRouter)

// Task
app.use(taskRouter)

// Starting Server

app.listen(port, () => {
    console.log('Listening at port:- ' + port)
})

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = '12345678'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('1234678',hashedPassword)
//     console.log(isMatch)
// }

// myFunction()