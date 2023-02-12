// ******* READ THIS V.V IMPORTANT***** 

//kyuki hm ab is code ko ot structure kar rhe hai lekin aap isko v pass kar sakte hai 
//sirf aapko is code ke file name ko old-task.js se tasks bananna hoga 


//we inport it from controllers task.js
const { rmSync } = require("fs");
const { rawListeners } = require("../models/Task");
const Task = require("../models/Task");


//.find is a mongoose query which help us to find json 
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        //we can also use this 
        res.status(200).json({tasks})
        // res.status(200).json({tasks, amount:task.length })
        // res.status(200).json({ status: 'success', data: {tasks, nbHits: tasks.length }})
    } catch (error) {
        res.status(500).json({ msg: error })
    }
};


const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body) 
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({msg: error})
    }
};


const getTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        //ye error tab aayega jaab id me syntex wrong ho lekin syntext utne he ho jitne hone chaheye 
        if(!task){
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({ task });
        //if we have the correct number of syntex  but syntex galat ho 
    } catch (error) {
        res.status(500).json({msg: error})
    }
};


const updateTask = async(req, res) => {
  try {
    const {id: taskID} = req.params;
    //first we need to pass id that need to updata and second we need to pass new data 
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new: true, 
        runValidators: true, 
    })   
    if(!task) {
        return res.status(404).json({msg: `No task with id : ${taskID}`})
    }
    res.status(200).json({id:taskID, data: req.body})  //we are passing data because if we were updating something you need that new info 
  } catch (error) {
    
  }
};



const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params; 
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({msg: error})
    }
};


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};



























