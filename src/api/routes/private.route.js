import * as pollController from '../controllers/poll.controller'
import * as userController from '../controllers/user.controller'

import express from 'express'

const router = express.Router()

// Poll
router.route('/polls').get(pollController.listPollsWithoutAssociation)
router.route('/polls/me').get(pollController.getByUser)
router.route('/polls/me/graph').get(pollController.graph)
router.route('/polls/associate').post(pollController.associate)

// Oauth
router.route('/oauth/logout').post(userController.logout)

export default router
