
//THUNDERCLIENT --- Postman: Postman is an API(application programming interface) development tool which helps to build, test and modify APIs.

const express = require('express')
const app = express()

const people = require('./routes/people')
const auth = require('./routes/auth')


//static assests
app.use(express.static('./methods-public'))

//parse form data -- This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false }))

//parse json -- 
app.use(express.json())

//this is very imp we gave /api/people automatically   -- this is for people 
app.use('/api/people', people)
//this is for auth.js 
app.use('api/people', auth)


app.listen(5000, ()=>{
  console.log('server is listening in port 5000....')
})




