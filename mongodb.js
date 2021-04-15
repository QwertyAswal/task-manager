const { MongoClient, ObjectID } = require('mongodb')

const connnectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'


MongoClient.connect(connnectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Failed to connect to database.\nError:- ' + error)
    }
    const db = client.db(dbName)

    db.collection('tasks').deleteOne({ description: "description 1" })
        .then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
})