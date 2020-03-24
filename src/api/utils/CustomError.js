const httpStatus = require('http-status')

class CustomError extends Error {
  constructor({
    message,
    errors,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    stack = new Error().stack,
  }) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errors = errors
    this.status = status
    this.stack = stack
  }
}

module.exports = CustomError
