const jwt = require('jsonwebtoken')
function validationErrorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: err.errors // This will include the specific validation errors
        });
    }
    next(err); // Pass the error to the next middleware if it's not a validation error
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

function tokenExtractor(req, res, next) {
  const token = getTokenFrom(req)
  req.token = token
  next()

}

function userExtractor(req, res, next) {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const userId = decodedToken.id
  req.userId = userId
  next()
}


const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
    }else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error)
  }


module.exports = {errorHandler, tokenExtractor, userExtractor}