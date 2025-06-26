const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')


// adding middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// testing routes
app.get('/',(req,res)=>{
    res.send('API is running!')
})


// import the routes
const userRoutes = require('./routes/userRoutes')
app.use('/api/v1/user',userRoutes)

module.exports = app;