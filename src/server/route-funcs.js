const bcrypt = require('bcrypt')

const { pool } = require('../helper/pg-conn')
const db_queries = require('./db-queries')
const logger = require('../helper/logger').config('route-functions')

const verifySession = (req, res, next) => {
    if (!req.session.loggedIn) {
        logger.debug('Unauthed user tried to access a route that requires auth')
        return res.json({ success: false })
    }
    
    next()
}

const verifyRank = (required_rank=100) => {
    return (req, res, next) => {
        if (!req.session.access_rank || req.session.access_rank > required_rank) {
            logger.debug(`User tried to access a route that requires rank ${required_rank} or lower`)
            return res.json({ success: false })
        }

        next()
    }
}

const setLoginStatus = async (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password || password.length > 50) {
        logger.debug('Disallowed login username/password provided')
        res.json({ success: false })
        return
    }

    let db_res
    try {
        db_res = await pool.query(db_queries.login, [ username ])
    } catch (err) {
        logger.error('Could not obtain user information')
        logger.debug(err.toString())
        res.json({ success: false })
        return
    }

    if (db_res.rows.length === 0) {
        logger.debug(`Unknown username ${username} provided`)
        res.json({ success: false })
        return
    }
    
    const user_id = db_res.rows[ 0 ].id
    const saved_hash = db_res.rows[ 0 ].password
    const user_group_id = db_res.rows[ 0 ].group

    if (! await bcrypt.compare(password, saved_hash)) {
        logger.debug(`User ${username} attempted to login with wrong password`)
        res.json({ success: false })
        return
    }

    logger.debug(`User ${username} just logged in`)

    req.session.loggedIn = true
    req.session.username = username
    req.session.user_group_id = user_group_id
    req.session.user_id = user_id
    
    res.cookie('username', username) // Js cookie

    next()
}

const setAccessRank = async (req, res, next) => {
    const user_group_id = req.session.user_group_id

    let db_res
    try {
        db_res = await pool.query(db_queries.user_group, [ user_group_id ])
    } catch (err) {
        logger.error('Could not obtain user group information')
        logger.debug(err.toString())
        res.json({ success: false })
        return
    }

    if (!db_res.rows.length === 0) {
        logger.debug(`Unknown group id ${user_group_id} provided`)
        res.json({ success: false })
        return
    }

    const access_rank = db_res.rows[ 0 ].access_rank

    req.session.access_rank = access_rank

    next()
}

const setBannedStatus = async (req, res, next) => {
    const user_id = req.session.user_id

    let db_res
    try {
        db_res = await pool.query(db_queries.banned, [ user_id ])
    } catch (err) {
        logger.error('Could not obtain user ban status information')
        logger.debug(err.toString())
        res.json({ success: false })
        return
    }

    req.session.banned = db_res.rows.length !== 0

    next()
}

const routeEndSuccess = (req, res) => {
    res.send({ success: true })
}

module.exports = {
    verifySession: verifySession,
    verifyRank: verifyRank,
    setLoginStatus: setLoginStatus,
    setAccessRank: setAccessRank,
    setBannedStatus: setBannedStatus,
    routeEndSuccess: routeEndSuccess
}