import CustomError from '../utils/CustomError'
import db from '../database/models'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import uuidv4 from 'uuid/v4'

const privateKey = `{
  kty: 'oct',
  kid: '1d9be796-7b64-4921-a1eb-18d42684fca4',
  k: 'VUHTqXjDYa4DNksKpQWN1MuKye1R24Q7M5LTYEhyP_o',
  alg: 'HS256',
}`

const generateToken = (sub, type, jti) => {
  const id = uuidv4()
  const data = {
    sub: sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    token_use: type,
    jti: id,
  }

  if (jti) data.ati = jti

  const token = jwt.sign(data, privateKey)

  return { id: id, token: token }
}

export const decodeToken = async req => {
  try {
    const { authorization } = req.headers
    return await authenticate(authorization)
  } catch (error) {
    console.log('unauthenticated user')
  }
  return null
}

export const authenticate = async token => {
  try {
    const obj = jwt.verify(token.replace('Bearer ', ''), privateKey)
    const dbToken = await db.Tokens.findOne({
      where: { jti: obj.ati || obj.jti, active: true },
      include: [
        {
          model: db.Users,
          as: 'user',
        },
      ],
    })
    if (!dbToken || dbToken.user.id !== obj.sub) {
      throw new CustomError({
        message: 'Invalid Login',
        status: httpStatus.UNAUTHORIZED,
      })
    }

    return dbToken
  } catch (err) {
    throw new CustomError({
      message: 'Invalid Login',
      status: httpStatus.UNAUTHORIZED,
    })
  }
}

export const invalidate = async id => {
  await db.Tokens.update(
    { active: false },
    { where: { userId: id, active: true } },
  )
}

export const create = async user => {
  const access = generateToken(user.id, 'access')
  const refresh = generateToken(user.id, 'refresh', access.id)

  const result = {
    access: access.token,
    refresh: refresh.token,
    userId: user.id,
    jti: access.id,
    username: user.username,
  }
  await db.Tokens.create(result)
  return result
}

export const refresh = async token => {
  const dbToken = authenticate(token)

  invalidate(dbToken.user.id)

  return await create(dbToken.user)
}
