const User = require('../models/User')

const {StatusCodes} = require("http-status-codes")  //now I also want status code so we are using library npm i http-status-codes

const {BadRequestError, UnauthenticatedError} = require("../errors")  //if one of our value is missing then we throw out own cusom error 

// const bcrypt = require('bcryptjs')  //for password hashing we will use ---*** bcrypt js --- npm i bcrypt js 
   
// const jwt = require('jsonwebtoken')   // now it is in user.js







/* This is Register Function Start ------->  */



const register = async(req, res)=>{

// const {name, email, password} = req.body

// const tempUser = {name, email, password:hashedPassword}
//     //now we can create new user we are using create method since i want mongoose to do all the validation we simply padd req.body
//     const user = await User.create({...req.body})

//this is very imp to change password into  hash **** so that our password will secure 

/*

***now we are doing this in dynamically in User.js**** 

const salt = await bcrypt.genSalt(10); 
const hashedPassword = await bcrypt.hash(password, salt)
const tempUser = {name, email, password:hashedPassword}
*/


//now we can create new user we are using create method since i want mongoose to do all the validation we simply padd req.body
    // const user = await User.create({...tempUser})


    const user = await User.create({...req.body})


    /* 
    //we can write it in User.js ---- 
    //this is json webtoken
    const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
        expiresIn: '30d', 
    })  
    
    */ 
   //here i only have to do createjwt 
   const token = user.createJWT()

    res
    .status(StatusCodes.CREATED)
    .json({ user:{name: user.name }, token })  // we will definitely send back to token
}








/*   This is our LOGIN function Start ------> 

weather we are getting emial and the password with same kind of value because that the whole setup for login 
in this case they dont need to provide name they just need to provide email and password if they dont we send 
the bad req after that we check the user into the database so basically we'll go with our user and find one 
and pass in the email and if we find one we will send back to the user if not of cause we'll send back another error 

*/ 




const login = async(req, res)=>{
    const {email, password} = req.body 

    if(!email || !password){
        throw new BadRequestError('Please Provide email and Password')
    }

    const user = await User.findOne({email})  
    
    // In this case if there is no user we throw UnauthenticatedError because in this case user is not providing valid credentials 
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials ')
    }

    const isPasswordCorrect = await user.comparePassword(password) 
    //compare password *** -- in User.js
    // if there is a user i also want to check whether the password matches  if the password is correct it will retrun token and all that if not then it will throq the error 
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }




// if user exist crete that token a
    const token =  user.createJWT();
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
}



module.exports = {
    register, 
    login, 
}















