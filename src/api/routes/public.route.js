import * as pollController from '../controllers/poll.controller'
import * as pollValidation from '../validations/poll.validation'
import * as useerValidation from '../validations/user.validation'
import * as userController from '../controllers/user.controller'

import express from 'express'
import validate from 'express-validation'

const router = express.Router()

// users
router
  .route('/users')
  .post(validate(useerValidation.createUser), userController.create)

// Oauth
router.route('/oauth/login').post(userController.login)
router.route('/oauth/refresh').post(userController.refresh)

// poll
router
  .route('/public/polls')
  .post(validate(pollValidation.createPoll), pollController.create)

router.route('/public/polls/:id').patch(pollController.edit)

router.route('/public/polls/:id/answers').post(pollController.answer)
router.route('/public/polls/:id/answers/:answerid').patch(pollController.answer)
router
  .route('/public/polls/:id/answers/:answerid')
  .get(pollController.getAnswer)

router.route('/public/polls/:id').get(pollController.get)

export default router
