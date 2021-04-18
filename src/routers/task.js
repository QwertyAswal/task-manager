const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


// Create
router.post('/tasks', auth, async (req, res) => {
    req.body.owner = req.user._id
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Read
router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        const tasks = req.user.tasks
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id: _id, owner: req.user._id })
        if (task)
            res.send(task)
        else
            res.status(404).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update
router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const requestedUpdates = Object.keys(req.body)
    const isValidOp = requestedUpdates.every(update => allowedUpdates.includes(update))
    if (!isValidOp)
        return res.status(400).send({ error: 'Invalid Updates' })
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task)
            res.status(404).send()
        else {
            requestedUpdates.forEach(update => task[update] = req.body[update])
            await task.save()
            res.send(task)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (task)
            res.send(task)
        else
            res.status(404).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router