require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection')
var cors = require('cors')
const route = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
dbConnection()
app.use(route)




app.get('/', function (req, res) {
  res.send('Hello World')
})



app.listen(8000,()=>{
    console.log("Server is running port 8000")
})


//EcommerceOrebi 
//pwyzjpOIj5mQLD9p
//souravacharjee360
//mongodb+srv://souravacharjee360:pwyzjpOIj5mQLD9p@cluster0.nv3e8vk.mongodb.net/EcommerceOrebi?retryWrites=true&w=majority