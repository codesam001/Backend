
const express = require('express')
const app = express()

const { products } = require('./data')

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products<a/>')
})

app.get('/api/products', (req,res)=>{
const newsProducts = products.map((product)=>{
  const {id, name, image} = product;
  return {id, name, image}
})
res.json(newsProducts)
})

//:productID is a route parameter
app.get('/api/products/:productID', (req, res)=>{
  // console.log(req)
  // console.log(req.params)
  const { productID } = req.params  //params is an object of the req object that contains route parameters
  
  const singleProduct = products.find((product) => 
  product.id === Number(productID) 
  )
  if(!singleProduct){
  return res.status(404).send('Product does not Exit')
  }
 return res.json(singleProduct)
console.log(singleProduct)
})                                                                                                                                                           ,                          

app.get('/api/products/:productID/reviews/:reviewID', (req, res)=>{
console.log(req.params)
res.send('hello world')
})


//Query String Parameters also called url Parameters --- 

app.get('/api/v1/query',(req, res)=>{
console.log(req.query)
//I can add as many query string parameters as I want 
const {search, limit} = req.query
let sortedProducts = [...products]  //spread oprater

if(search){
  sortedProducts = sortedProducts.filter((product)=>{
    return product.name.startsWith(search)
  })
  
}
if(limit){
  sortedProducts = sortedProducts.slice(0, Number(limit))
}
if(sortedProducts.length < 1){
// res.status(200).send('no product matched your search')  //you can send this also 
 return res.status(200).json({sucess: true, data:[]})  //but this is commenly used 
}

//we can only have one respose per request baki time res bhejne ke liye aage se return lagana padega
res.status(200).json(sortedProducts)

})


app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
  })
  



























