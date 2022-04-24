const express = require('express')
const session = require('express-session')
const path = require('path')

const middleware = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: 'false' }))

    const session_config = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }
    if (process.env.NODE_ENV === 'production') {
        session_config.cookie.secure = true
    }
    app.use(session(session_config))

    if (process.env.NODE_ENV === 'production') {
        app.use((req, res, next) => {
            req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
        })
    }

    app.use(express.static(path.join(process.env.PUBLIC_FOLDER, 'static')))
}

module.exports = {
    config: middleware
}