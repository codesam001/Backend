require('dotenv').config()

//this is imp just see controllers/products 
require('express-async-errors')


const express = require('express')
const app = express();
const productsRouter = require("./routes/products")
const connectDB = require("./db/connect")


const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.static('./public'));
app.use(express.json());


//routes
app.get('/', (req, res)=>{
    res.send('<h1>Store API</h1> <a href="/api/v1/products"/>Product<a/>')
})


app.use('/api/v1/products', productsRouter);






//products route
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000;

const start = async (url) => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();













