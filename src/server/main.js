require('dotenv').config()
const express = require('express')

const logger = require('../helper/logger').config('login-website')
const routes = require('./routes')
const middleware = require('./middleware')

const app = express()
middleware.config(app)
routes.config(app)

if (!process.env.PORT) {
    logger.error('PORT environmental variable not set')
    process.exit(-1)
}

app.listen(process.env.PORT, () => {
    logger.info(`Listening on port ${process.env.PORT}`)
})