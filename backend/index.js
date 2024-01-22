require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection')
var cors = require('cors')
const app = express()


app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})

console.log(process.env.DATABASE_NAME) 

dbConnection()

app.listen(8000,()=>{
    console.log("Server is running port 8000")
})


//EcommerceOrebi 
//pwyzjpOIj5mQLD9p
//souravacharjee360
//mongodb+srv://souravacharjee360:pwyzjpOIj5mQLD9p@cluster0.nv3e8vk.mongodb.net/EcommerceOrebi?retryWrites=true&w=majority