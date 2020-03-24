import CustomError from '../api/utils/CustomError'
import actuator from 'express-actuator'
import allRoutes from 'express-list-endpoints'
import bodyParser from 'body-parser'
import compress from 'compression'
import cors from 'cors'
import { decodeToken } from '../api/services/token.service'
import error from '../api/middlewares/error'
import express from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import { logs } from './vars'
import methodOverride from 'method-override'
import morgan from 'morgan'
import { name } from '../../package.json'
import privateRoute from '../api/routes/private.route'
import publicRoute from '../api/routes/public.route'

const app = express()

app.use(morgan(logs))
app.use(actuator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(methodOverride())
app.use(helmet())
app.use(cors())

// mount api public routes
app.use(`/${name}/`, publicRoute)

// mount api private routes
app.use(`/${name}/`, async (req, res, next) => {
  const user = await decodeToken(req)

  if (!user) {
    const err = new CustomError({
      message: 'Invalid Login',
      status: httpStatus.UNAUTHORIZED,
    })
    next(err)
  } else {
    // eslint-disable-next-line require-atomic-updates
    req.user = user
    next()
  }
})

app.use(`/${name}/`, privateRoute)

app.use(error.converter)
app.use(error.notFound)
app.use(error.handler)

console.log(allRoutes(app))

module.exports = app
