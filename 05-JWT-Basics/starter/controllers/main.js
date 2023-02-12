//setup authentication so only the request with JWT can access to dashboard

//check username, password in post(login) request
//if exist create new JWT
//send back to front-end

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/bad-request");



const login = async (req, res) => {
    //check for username and password
    const { username, password } = req.body; //because this is post route so data will go into the body

    //before we  issue the tokens which allow the front-end to access the route wheather the username and password have been provided
    // we have three option for this
    //1. -- Mongo  first option is " mongo require validation" --it will check for us if the value is not present it will spits back the error this case we are not connecting to the data base another
    //2. -- Joi-- second  option we have setup entire additional layer of validataion in order to accomplish that task we'll utillize another pacakage -----"joy"--------
    //3. --check in the controller--  option is actually checking for of these value over here if the user name and pasword not been provided then i will send you back error  in this case
    //we have package that wraps all of our route and we simply will throw a error

    if (!username || !password) {
        throw new BadRequestError("Please provide email and password" );
    }

    //just for demo, normally provided by DB!!!!
    const id = new Date().getDate();

    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
        
    });

    res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {


    //now we will set this in auth.js ******-------> 

    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new CustomAPIError("No token provided", 401);
    // }

    // const token = authHeader.split(' ')[1];

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     console.log(decoded)
    //     const luckyNumber = Math.floor(Math.random()*100);
    //     res.status(200).json({
    //         msg: `Hello, ${decoded.username}`,
    //         secret: `Here is your authorized data, your lucky number is  ${luckyNumber}`,
    //     });
    // } catch (error) {
    //     throw new CustomAPIError("No authorized to access this route ", 401);
    // }

    console.log(req.user); 


    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is  ${luckyNumber}`,
    });

};

module.exports = {
    login,
    dashboard,
};
 
