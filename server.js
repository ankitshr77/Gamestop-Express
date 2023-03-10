const express = require('express')
const app = express()
const mongoose = require('mongoose')

const ProductRoute = require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')

app.use(express.json())

app.listen(3000, ()=>{
    console.log("Express JS running on port 3000")
})

mongoose.connect("mongodb+srv://ankitshr:ankitankit@cluster0.3ezjlf2.mongodb.net/GameStop?retryWrites=true&w=majority")
.then(()=>{
    console.log("Mongo DB connection successful.")
})
.catch((error)=>{
    console.log(error)
})

// ROUTES

app.use('/api', ProductRoute)
app.use('/api', UserRoute)