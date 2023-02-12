
//THUNDERCLIENT --- Postman: Postman is an API(application programming interface) development tool which helps to build, test and modify APIs.


const express = require('express')
const router = express.Router()

let {people} = require('./data')




//GET method -- this is for read data 
router.get('/api/people', (req, res)=>{
res.status(200).json({success:true, data: people})
})


//POST method -- I am tring to add data 
router.post('/api/people', (req, res)=>{
  const {name} = req.body
  if(!name){
    //res.status(201).json({}) //this is fream
    return res.status(400).json({success:false, msg:'Please Provide name value'})
  }
res.status(201).send({success:true, person:name})
})
 
router.post('/api/people/postmon', (req, res)=>{
  const {name} = req.body; 
  if(!name){
    return res.status(400).json({success: false, msg: "Plese Provide name value"})
  }
  res.status(201).send({success:true, data: [...people,name]})
})

//POST method 
router.post('/login', (req, res)=>{
const {name} = req.body;
if(name){
  return res.status(200).send(`Welcome ${name}`)
}
res.status(401).send('Please Provide Credentials')
})



//PUT -- Update Data (params + send data)

router.put('/api/people/:id', (req, res)=>{
  const { id } = req.params;
  const { name } = req.body;
  
  const person = people.find((person)=> 
    person.id === Number(id)) 
    if(!person){
      return res.status(404).json({success: false, msg: `no person with id ${id}`})
    }
    const newPeople = people.map((person)=>{
      if(person.id === Number(id)){
        person.name  = name 
      }
      return person
    })
    res.status(200).json({success:true, data: newPeople})
})


//DELETE Method --- this is for delete somethif from api 

router.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
}) 




router.listen(5000, ()=>{
  console.log('server is listening in port 5000....')
})

























