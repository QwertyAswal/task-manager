const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Logout
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Read
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Update
router.patch('/users/me', auth, async (req, res) => {
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOp = requestedUpdates.every(update => allowedUpdates.includes(update))

    if (!isValidOp) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }

    try {
        const user = req.user
        requestedUpdates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router