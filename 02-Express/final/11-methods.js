//Method -- 
//Get -- Read Data
//Post -- Insert Data 
//Put -- Update Data 
//Delete -- Delete Date

//Get --- www.store.com/api/orders --- get all order 
//Post --- www.store.com/api/order --- place an order(send Data)
//Get --- www.store.com/api/order/:id --- get single order(path params)
//put ---   www.store.com/api/order/:id  --- update specific order (params + send data)
//Delete --- www.store.com/api/order/:id  ---  delete order(path params )


const express = require('express')
const app = express()
let {people} = require('./data')


//static assests
app.use(express.static('./methods-public'))

//parse form data -- This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false }))

//GET method -- this is for read data 
app.get('/api/people', (req, res)=>{
res.status(200).json({success:true, data: people})
})


//POST method 
app.post('/login', (req, res)=>{
const {name} = req.body;
if(name){
  return res.status(200).send(`Welcome ${name}`)
}

res.status(401).send('Please Provide Credentials')
})

app.listen(5000, ()=>{
  console.log('server is listening in port 5000....')
})
























