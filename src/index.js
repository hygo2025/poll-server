import { env, port } from './config/vars'

import app from './config/express'
import db from './api/database/models'
import logger from './config/logger'

db.sequelize.sync().then(() => {
  // listen to requests
  app.listen(port, () => logger.info(`server started on port ${port} (${env})`))
})

/**
 * Exports express
 * @public
 */
module.exports = app
