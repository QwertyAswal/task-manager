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