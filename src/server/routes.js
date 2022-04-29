const path = require('path')

const logger = require('../helper/logger').config('routes')
const route_funcs = require('./route-funcs')

const route = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(process.env.PUBLIC_FOLDER, 'index.html'))
    })

    //
    app.post('/signup', (req, res) => {
        
    })

    //A timing attack can be used to check if username exists in the DB
    //Might fix later, probably not
    //DoS attack also possible if bcrypt is extended to pwds of >70 bytes
    //https://security.stackexchange.com/a/184090
    app.post('/login',
        route_funcs.setLoginStatus,
        route_funcs.setAccessRank,
        route_funcs.setBannedStatus,
        route_funcs.routeEndSuccess
    )

    app.get('*', (req, res) => {
        logger.debug('404 page accessed')
        res.status(404).sendFile(path.join(process.env.PUBLIC_FOLDER, '404.html'))
    })
}

module.exports = {
    config: route
}