//this is to connet mongo with app.js 
const connectDB = require('./db/connect')
require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;



const tasks = require('./routes/tasks')
const notFound = require("./middleware/not-found")  //this is out notfound error 
const errorHandlerMiddlerware = require("./middleware/error-handler")

//***** middleware ---**** 
// we are sending json from our application and I want to exess that data in my route 
//so we will use middle-ware --- express json 
app.use(express.json());   //if we don't use this then we won't have data in req.body 

//this middleware is to serve static file
app.use(express.static('./public'))



//this is which app.js connect with task 
app.use('/api/v1/tasks', tasks)

//this middleware will handle our 404 and some kinf of custom response
app.use(notFound)  //this is for if someone will type wronge route 
app.use(errorHandlerMiddlerware)  //this is our customer error handler 

//app.get('/api/v1/tasks')     --get all the tasks 
//app.post('/api/v1/tasks')     -- create a new task 
//app.get('/api/v1/tasks/:id')  --- get single task 
//app.patch('/api/v1/tasks/:id')    --- update task 
//app.delete('/api/v1/tasks/:id')     --- delete task 




const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();












