require('dotenv').config()

const { database, host, password, username } = require('../config/vars')

module.exports = {
  development: {
    database: database,
    username: username,
    password: password,
    host: host,
    dialect: 'postgres',
  },

  test: {
    database: database,
    username: username,
    password: password,
    host: host,
    dialect: 'postgres',
  },

  production: {
    database: database,
    username: username,
    password: password,
    host: host,
    dialect: 'postgres',
  },
}
