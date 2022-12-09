require('dotenv').config()

const MONGO_URL = process.env.DATABASE_URL
const PORT = process.env.PORT

module.exports = {
    MONGO_URL,
    PORT
  }