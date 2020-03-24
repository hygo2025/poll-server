import * as userService from '../services/user.service'

import { create as createToken } from '../services/token.service'
import httpStatus from 'http-status'

export const create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body)
    const login = await createToken(user)
    res.status(httpStatus.CREATED)
    res.json(login)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const login = await userService.login(req.body)
    res.status(httpStatus.CREATED)
    res.json(login)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    const { userId } = req.user
    await userService.logout(userId)
    res.status(httpStatus.OK)
    res.json()
  } catch (error) {
    next(error)
  }
}

export const refresh = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const login = await userService.refresh(authorization)
    res.status(httpStatus.CREATED)
    res.json(login)
  } catch (error) {
    next(error)
  }
}
