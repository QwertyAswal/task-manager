const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('email invalid')
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    }
})

const me = new User({
    name: '      Shubham          ',
    email: 'shubham@mail.COm'
})

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const task1 = new Task({
//     description: 'Clean your room',
//     completed: false
// })

// task1.save().then((task1) => {
//     console.log(task1)
// }).catch((error) => {
//     console.log(error)
// })