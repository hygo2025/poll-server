/* eslint-disable no-unused-vars */
/* eslint-disable autofix/no-unused-vars */

import CustomError from '../utils/CustomError'
import { env } from '../../config/vars'
import expressValidation from 'express-validation'
import httpStatus from 'http-status'

const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  }

  if (env !== 'development') {
    delete response.stack
  }

  res.status(err.status)
  res.json(response)
}
exports.handler = handler

exports.converter = (err, req, res, next) => {
  let convertedError = err

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new CustomError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    })
  } else if (!(err instanceof CustomError)) {
    convertedError = new CustomError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    })
  }

  return handler(convertedError, req, res)
}

exports.notFound = (req, res) => {
  const err = new CustomError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  })
  return handler(err, req, res)
}
