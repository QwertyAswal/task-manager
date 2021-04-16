const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// Create
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(400).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

// Read
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOp = requestedUpdates.every(update => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValidOp) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }

    try {

        const user = await User.findById(_id)
        requestedUpdates.forEach(update => user[update] = req.body[update])
        await user.save()

        if (user)
            res.send(user)
        else
            res.status(404).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete
router.delete('/users/:id', async (req, res) => {
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



module.exports = router