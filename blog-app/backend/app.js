const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware  = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/blogs', blogsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/testing', testingRouter)
}

module.exports = app


