// const { stringify } = require("querystring");

const mongoose = require('mongoose');


//schema is very imp -- to structure our data base --
//when we use schema there is a structure so whatever we setup in a schema is goning to 
//passed on to this database and whatever comes as an extra is egnore 


const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)


























