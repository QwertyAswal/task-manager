const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


// Create
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Read
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const requestedUpdates = Object.keys(req.body)
    const _id = req.params.id
    const isValidOp = requestedUpdates.every(update => allowedUpdates.includes(update))
    if (!isValidOp)
        return res.status(400).send({ error: 'Invalid Updates' })
    try {
        const task = await Task.findById(_id)
        requestedUpdates.forEach(update => task[update] = req.body[update])
        await task.save()
        if (task)
            res.send(task)
        else
            res.status(404).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete
router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router