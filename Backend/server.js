const express = require('express')
const cors =require('cors')
const mongoose = require('mongoose');
const router=require('./routes/userroute')
const app = express()
const port = 3000

//Middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

//MongooDB
mongoose.connect('mongodb://127.0.0.1:27017/news')
  .then(() => console.log('Connected!'));

app.use('/',router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})