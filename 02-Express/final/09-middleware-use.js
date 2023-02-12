

const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

//this is our middleware  -- ye hamesha app.get se uper he hona chaheye 
//we can also add a path '/api'
app.use([authorize, logger])
//api /home/about/products 

//1. use vs route
//2. options of middleware
// our own -- built your own middle ware like we built 


// express -- 
//third party -- third party middleware like morgan --- npm i morgan 

// app.use(express.static('./public'))



app.get('/', (req, res)=>{
  res.send('Home')
})

app.get('/about' ,  (req, res)=>{
  res.send('About')
})
app.get('/api/products' , (req, res)=>{
  res.send('Product')
})
app.get('/api/items' ,  (req, res)=>{
  console.log(req.user)
  res.send('Api')
})

app.listen(5000, ()=>{
  console.log('server is listening in port 5000....')
})


























