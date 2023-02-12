//this is our cred function 
// const { Module } = require("module")

const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req, res) => {
    //in this case we are not looking for all the jobs like we did in the past we are only looking for the 
    //job that is associated with this user 
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
  }


  const getJob = async (req, res) => {
    //here we are going to look two things in the request first jobs we can access it in the params object 
    //when it comes to user that one is located it the user object that we are getting from the middleware 
    const {
      user: { userId },
      params: { id: jobId },
    } = req
    
  //this one for if everything is correct then we are going to look for the 
    const job = await Job.findOne({
      _id: jobId,
      createdBy: userId,
    })
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
  }
  

  
  const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
  }


  const updateJob = async (req, res) => {
    //First ye wala is liye hai ki sabse pahle hm usko _id ko select kar paye jisko update karna hai 
      //it will not change here we are going to look for the two things in the request first jobs we can access it in the params object 
    //when it comes to user that one is located it the user object that we are getting from the middleware 
    const {
      body: { company, position },  //here we are sending this two thing into the body 
      user: { userId },
      params: { id: jobId },
    } = req
  
    //ye is liye hai ki company or postion dono me se kohe v empty na rhe paye 
    if (company === '' || position === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    //now we will use our find and update we will pass three thing 
    // 1. What we want to update? 
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },  //2. we want to pass which job we are looking for  
      req.body, 
      { new: true, runValidators: true }
    )
    //3.if the job doest not exist then error 
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
  }



  const deleteJob = async (req, res) => {
     //First ye wala is liye hai ki sabse pahle hm usko _id ko select kar paye jisko update karna hai 
      //it will not change here we are going to look for the two things in the request first jobs we can access it in the params object 
    //when it comes to user that one is located it the user object that we are getting from the middleware 
    const {
      user: { userId },
      params: { id: jobId },
    } = req
  

    const job = await Job.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    })
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
  }


module.exports = {
    getAllJobs, 
    getJob, 
    createJob, 
    updateJob, 
    deleteJob, 
}





















