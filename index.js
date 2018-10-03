require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const app = express()
const port = 8080
const config = require('./config')



app.use(cors())
app.use(bodyParser.json())

massive(process.env.DATABASE_STRING) // or config.dataBaseString
    .then(db => {
        app.set('db', db)
        console.log('database is connected')
        // db.create_table()
        //     .then(() => {
        //         console.log('table is created')
        //     })
    })
    .catch(err => {
        console.log('database connection error', err)
    })

app.post('/add', (req, res) => {
    const {user_name, email} = req.body
    const db = req.app.get('db')

    db.insert_data([user_name, email])
        .then(() => {
            res.send('saved data successfully')
        })
        .catch((err) => {
            console.log('error', err)
        })
})

app.get('/getData', (req, res) => {
    const db = req.app.get('db');

    db.get_all()
        .then(results => {
            res.send(results[0])
        })
        .catch(err => {
            console.log('line 46', err)
        })
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})  