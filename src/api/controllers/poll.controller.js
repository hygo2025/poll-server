import * as pollService from '../services/poll.service'

import { decodeToken } from '../services/token.service'
import httpStatus from 'http-status'

export const create = async (req, res, next) => {
  try {
    const user = await decodeToken(req)
    const poll = await pollService.create(req.body, user)
    res.status(httpStatus.CREATED)
    res.json(poll)
  } catch (error) {
    next(error)
  }
}

export const edit = async (req, res, next) => {
  try {
    const pollId = req.params.id
    const poll = await pollService.edit(pollId, req.body)
    res.status(httpStatus.CREATED)
    res.json(poll)
  } catch (error) {
    next(error)
  }
}

export const associate = async (req, res, next) => {
  try {
    const { userId } = req.user
    const { pollIds } = req.body
    await pollService.associate(userId, pollIds)
    res.status(httpStatus.OK)
    res.json()
  } catch (error) {
    next(error)
  }
}

export const listPollsWithoutAssociation = async (req, res, next) => {
  try {
    const poll = await pollService.listPollsWithoutAssociation(req.body)
    res.status(httpStatus.CREATED)
    res.json(poll)
  } catch (error) {
    next(error)
  }
}

export const getByUser = async (req, res, next) => {
  try {
    const { userId } = req.user
    const poll = await pollService.getByUserId(userId)
    res.status(httpStatus.OK)
    res.json(poll)
  } catch (error) {
    next(error)
  }
}

export const get = async (req, res, next) => {
  try {
    const pollId = req.params.id
    const poll = await pollService.get(pollId)
    res.status(httpStatus.OK)

    const first = (poll || [{}])[0]
    res.json(first)
  } catch (error) {
    next(error)
  }
}

export const graph = async (req, res, next) => {
  try {
    const { userId } = req.user
    const graph = await pollService.graph(userId)
    console.log(graph)
    res.status(httpStatus.OK)
    res.json(graph)
  } catch (error) {
    next(error)
  }
}

export const answer = async (req, res, next) => {
  try {
    const pollId = req.params.id
    const answerid = req.params.answerid
    const user = await decodeToken(req)

    const answer = await pollService.answer(pollId, answerid, user)
    res.status(httpStatus.OK)
    res.json(answer.toJSON())
  } catch (error) {
    next(error)
  }
}
