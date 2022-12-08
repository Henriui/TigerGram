require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const tigerApp = express()

// Morgan logger

morgan.token('body', (req) => JSON.stringify(req.body))
tigerApp.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

// Gets 

