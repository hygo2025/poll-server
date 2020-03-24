import Joi from 'joi'

export const createUser = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
}
