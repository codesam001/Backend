
const express = require('express')
const router = express.Router()

const  {
  getPeople,
  createPerson,
  createPersonPostman,
  UpdatePerson,
  delatePerson,
} = require('../controllers/people')

// setup route these are our routers ---- 
router.get('/',  getPeople )
router.post('/', createPerson )
router.post('/postmon', createPersonPostman)
router.put('/:id', UpdatePerson)
router.delete('/:id', delatePerson ) 

// second-way to setup routes --- this is same 
// router.route('/').get(getPeople).post(createPerson)
// router.route('/postman').post(createPersonPostman)
// router.route('/:id').put(updatePerson).delete(deletePerson)


module.exports = router




























