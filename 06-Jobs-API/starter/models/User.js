
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')   //for password hashing we will use ---*** bcrypt js --- npm i bcrypt js 
const jwt = require('jsonwebtoken')   



const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: [true, 'Please provide name'],
        minlength: 3, 
        maxlength: 50, 
    }, 
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Please Provide Password'],
        // validate: [validateEmail, 'Please fill a valid email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'
        ],
    }, 
    password:{
        type: String,
        required: [true, 'Please Provide Password'],
        minlength: 6, 
    }, 
})


//***---> ye hm password ho hash###  karne ke liye kar rhe hai isko hm auth.js me v like sakte the but ese likhna comfortable rahga  
UserSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt) 
})


//jwt -- json web token 
UserSchema.methods.createJWT = function ()  {
return jwt.sign ({userId : this._id, name: this.name}, 
    process.env.JWT_SECRET, 
    {
    expiresIn: process.env.JWT_LIFETIME, 
})
}

//compare password 
    // in a bcryot package we have a function by the name of compare and it compare the hashed passwords 
    //if we hash the password that's it but with compare method we compare hash passwords and if they match 
    //we send back to the token and user has successfully login 

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch 
} 




module.exports = mongoose.model('User', UserSchema)


















