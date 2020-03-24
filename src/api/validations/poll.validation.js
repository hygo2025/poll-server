import Joi from 'joi'

export const createPoll = {
  body: {
    title: Joi.string().required(),
    options: Joi.array()
      .min(1)
      .required(),
  },
}
