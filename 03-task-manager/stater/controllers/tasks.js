//we inport it from controllers task.js
const { rmSync } = require("fs");
const { rawListeners } = require("../models/Task");
const Task = require("../models/Task");
const { creteCustomError } = require("../errors/custom-error")

//THis is to short this content with async which is in middleware function 
const asyncWrapper = require('../middleware/async')

//.find is a mongoose query which help us to find json 
const getAllTasks = asyncWrapper (async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
);


const createTask = asyncWrapper (async (req, res) => {
  
        const task = await Task.create(req.body) 
        res.status(201).json({ task });
    }
);


const getTask = asyncWrapper( async (req, res, next) => {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        //ye error tab aayega jaab id me syntex wrong ho lekin syntext utne he ho jitne hone chaheye 
        if(!task){
            return next(creteCustomError(`No task with id : ${taskID}`, 404))
        
        } 
        res.status(200).json({ task });
        //if we have the correct number of syntex  but syntex galat ho 
});


const updateTask = asyncWrapper( async(req, res) => {

    const {id: taskID} = req.params;
    //first we need to pass id that need to updata and second we need to pass new data 
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new: true, 
        runValidators: true, 
    })   
    if(!task) {
        return next(creteCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({id:taskID, data: req.body})  //we are passing data because if we were updating something you need that new info 
  } 
);



const deleteTask = asyncWrapper( async (req, res) => {
        const {id:taskID} = req.params; 
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return next(creteCustomError(`No task with id : ${taskID}`, 404))
        }
        res.status(200).json({ task })
    } 
);


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
