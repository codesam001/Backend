//Express js -- it is not built-in module 
//npm install express 


const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res)=>{
    console.log('user  the resource')
    res.status(200).send('Home Page is here')
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page is here')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port, () => {
  console.log(`server is listening on port is ${port}...`)
}) 



// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
































