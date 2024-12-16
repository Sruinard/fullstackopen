function validationErrorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: err.errors // This will include the specific validation errors
        });
    }
    next(err); // Pass the error to the next middleware if it's not a validation error
}

module.exports = {validationErrorHandler}