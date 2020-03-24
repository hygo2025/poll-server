require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  host: process.env.HOST,
  password: process.env.PASSWORD,
  username: process.env.USERNAME,
  database: process.env.DATABASE,
}
