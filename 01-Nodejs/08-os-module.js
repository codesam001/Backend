//Build-In Module --- Those module which is already mode by some other people we are just using them 


//os module  -- oprating system

const os  = require('os')

//info about current user 

const user = os.userInfo()
console.log(user)

//method returns the system uptime in seconds 

console.log(`The system Uptime is ${os.uptime()} seconds`)


const currentsOS = {
    name: os.type(),
    realase: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}

console.log(currentsOS)




