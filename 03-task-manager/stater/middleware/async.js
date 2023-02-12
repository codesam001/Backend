

const asyncWrapper = (fn) =>{
    return async(req, res, next) => {
       try {
        await fn(req, res,next)
       } catch (error) {
        next(error)  // Pass errors to Express.
       } 
    }

}


module.exports = asyncWrapper
































