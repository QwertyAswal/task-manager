const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


// User

// Create
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(400).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Read
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (user)
            res.send(user)
        else
            res.status(404).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update
app.patch('/users/:id', async (req, res) => {
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOp = requestedUpdates.every(update => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValidOp) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (user)
            res.send(user)
        else
            res.status(404).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete
app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (user)
            res.send(user)
        else
            res.status(404).send()
    } catch (e) {
        res.status(500).send()
    }
})





// Task

// Create
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Read
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (task)
            res.send(task)
        else
            res.status(404).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update
app.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['descripiton', 'completed']
    const requestedUpdates = Object.keys(req.body)
    const _id = req.params.id
    const isValidOp = requestedUpdates.every(update => allowedUpdates.includes(update))
    if (!isValidOp)
        return res.status(400).send({ error: 'Invalid Updates' })
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (task)
            res.send(task)
        else
            res.status(404).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete
app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (task)
            res.send(task)
        else
            res.status(404).send()
    } catch (e) {
        res.status(500).send()
    }
})



// Starting Server

app.listen(port, () => {
    console.log('Listening at port:- ' + port)
})