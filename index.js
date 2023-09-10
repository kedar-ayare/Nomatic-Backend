require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const userRoute = require('./routes/user')
const prodRoute = require('./routes/product')
const order = require('./routes/order')

app.use(express.json())
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

// CONNECTION WITH DATABASE
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})


app.use('/api/users', userRoute)
app.use('/api/products', prodRoute)
app.use('/api/order', order)



// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmIwMWM4OTJlNWMwNjYwM2Y1YWE1ZSIsImlhdCI6MTY5NDE3MjIwNCwiZXhwIjoxNzAxOTQ4MjA0fQ.SVg_QpcstNPItWZ5so98BuAeH8hiUDJW-1Xn11bdovs"
// }


