
//a custructor method is a special method we invoke when we create a new instance od a class now 
// we can pass two argument error messgage and status code 


class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message)
      this.statusCode = statusCode
    }
  }
  
  const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
  }
  
  module.exports = { createCustomError, CustomAPIError }









