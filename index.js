const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const app = express()
const port = 8080


app.use(cors())
app.use(bodyParser.json())

massive('postgres://lterafkrggrvlz:9f8e45e116193e4a8b9b35ef7b8bccfd97f578be0e493fc0e1f8b4a6161ce9a3@ec2-50-16-196-57.compute-1.amazonaws.com:5432/d1ie5otd71r03i?ssl=true')
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