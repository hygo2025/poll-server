import { env, port } from './config/vars'

import app from './config/express'
import logger from './config/logger'

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`))

/**
 * Exports express
 * @public
 */
module.exports = app
