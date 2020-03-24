import {
  refresh as createRefreshToken,
  create as createToken,
  invalidate as invalidateToken,
} from './token.service'

import CustomError from '../utils/CustomError'
import bcrypt from 'bcrypt'
import db from '../database/models'
import httpStatus from 'http-status'

const saltRounds = 10

export const create = async obj => {
  const user = await db.Users.findOne({
    where: { username: obj.username },
  })

  if (user)
    throw new CustomError({
      message: 'User already exists',
      status: httpStatus.BAD_REQUEST,
    })

  const hash = await bcrypt.hash(obj.password, saltRounds)
  return db.Users.create({ username: obj.username, password: hash })
}

const validatePwd = async (obj, user) => {
  const result = await bcrypt.compare(obj.password, user.password)

  if (!result) {
    throw new CustomError({
      message: 'Invalid Login',
      status: httpStatus.UNAUTHORIZED,
    })
  }
}

export const login = async obj => {
  const user = await db.Users.findOne({
    where: { username: obj.username },
  })
  await validatePwd(obj, user)

  return createToken(user)
}

export const logout = async id => {
  await invalidateToken(id)
}

export const refresh = async authorization => {
  return createRefreshToken(authorization)
}
