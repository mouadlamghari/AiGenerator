const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const connect = require('./config/connect')
const PostRoute = require('./routes/PostRoutes.js')
const DallRoute = require('./routes/DallRoutes.js')
require('dotenv').config()
connect()
const app=express()

const originsConfigue={
    origin:(origin,callback)=>{
        if(!origin || origin=='http://localhost:5174'){
            callback(null,true)
        }
        else{
            callback(new Error('Cors Error'))
        }
    },
    optionsSuccessStatus:200
}
app.use((req,res,next)=>{
    res.header('access-control-allow-credentials',true)
    next()
})
app.use(cors(originsConfigue))
app.use(express.json({limit:'50mb'}))


app.use('/api/v1/post',PostRoute)
app.use('/api/v1/dall',DallRoute)


mongoose.connection.on('error',()=>{
    console.error.bind(console,'error in mongo db')
})

mongoose.connection.once('open',()=>{
})
app.listen(8000,()=>{
    console.log('listening')
})