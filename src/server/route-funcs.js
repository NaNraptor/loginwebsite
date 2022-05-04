const crypto = require('crypto')
const bcrypt = require('bcrypt')
const PostcodesIO = require('postcodesio-client')
var postcodes = new PostcodesIO()

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

const isAlpha = (str) => {
    var code, i, len
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i)
      if (!(code > 64 && code < 91) && // Upper alpha (A-Z)
          !(code > 96 && code < 123)) { // Lower alpha (a-z)
        return false
      }
    }
    return true
}

const isAlphaNumeric = (str) => {
    var code, i, len
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i)
      if (!(code > 47 && code < 58) && // Numeric (0-9)
          !(code > 64 && code < 91) && // Upper alpha (A-Z)
          !(code > 96 && code < 123)) { // Lower alpha (a-z)
        return false
      }
    }
    return true
}

const passwordStrength = (password) => {
    let strength = 0
    if (password.match(/[a-z]+/)) {
        strength += 1
    }
    if (password.match(/[A-Z]+/)) {
        strength += 1
    }
    if (password.match(/[0-9]+/)) {
        strength += 1
    }
    if (password.match(/[$@#%)*+(&!-]+/)) {
        strength += 1
    }

    return strength
}

const isEmail = (email) => {
    return email.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const isPostCode = async (post_code) => {
    return await postcodes.lookup(post_code)
}

const isNameTaken = async (name) => {
    let db_res
    try {
        db_res = await pool.query(db_queries.name_taken, [ name ])
    } catch (err) {
        logger.error('Could not obtain username information')
        logger.debug(err.toString())
        return
    }

    return db_res.rows.length !== 0
}
  
const verifySignUpData = async (req, res, next) => {
    const data = req.body
    const errors = []

    if (!data.username ||
        data.username.length < 4 ||
        data.username.length > 15 ||
        !isAlphaNumeric(data.username)
    ) {
        errors.push('Username must be between 4 and 15 characters and can only be alphanumeric.\n')
    }

    if (typeof (await isNameTaken(data.username)) === 'undefined') {
        errors.push('Internal error ocurred while checking if username is in use.\n')
    }

    if (await isNameTaken(data.username)) {
        errors.push('This username is already in use.\n')
    }

    if (!data.password ||
        data.password.length < 8 ||
        data.password.length > 50 ||
        passwordStrength(data.password) < 4
    ) {
        errors.push(
            'Password must be between 8 and 50 characters long and contain at least one lowercase letter, one capital letter, one number, and one symbol of \'$@#%)*+(&!-\'.\n'
        )
    }

    if (!data.first_name ||
        !data.last_name ||
        data.first_name.length > 15 ||
        data.last_name.length > 15 ||
        !isAlpha(data.first_name) ||
        !isAlpha(data.last_name)
    ) {
        errors.push('Names must be no more than 15 characters long and must contain only letters.\n')
    }

    if (!data.email ||
        data.email.length > 100 ||
        !isEmail(data.email)
    ) {
        errors.push('This email does not seem valid.\n')
    }

    if (!data.post_code ||
        data.username.length > 12 ||
        ! await isPostCode(data.post_code)
    ) {
        errors.push('Post code not valid according to the ONS Postcode Directory.\n')
    }

    if (data.additional.length > 250) {
        errors.push('Additional information is limited to 250 characters.\n')
    }

    if (errors.length !== 0) {
        errors[ errors.length - 1 ] = errors[ errors.length - 1 ].slice(0, -1) // Remove last new line
        return res.json({ success: false, stage: 'validation', errors: errors })
    }

    next()
}

const commitSignUp = async (req, res, next) => {
    const db_client = await pool.connect()

    try {
        const values = [
            crypto.randomUUID(),
            req.body.username,
            await bcrypt.hash(req.body.password, 12),
            Math.floor(Date.now() / 1000),
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.post_code,
            req.body.additional
        ]
        await db_client.query('BEGIN')
        const db_res = await db_client.query(db_queries.signup, values)
        await db_client.query('COMMIT')
    } catch (err) {
        logger.error('User could not be signed up, rolling back DB transaction')
        logger.debug(err.toString())
        await db_client.query('ROLLBACK')
    } finally {
        db_client.release()
    }

    next()
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

    res.cookie('access_rank', access_rank) // Js cookie

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

    res.cookie('banned', req.session.banned)

    if (req.session.banned) {
        req.session.banned_reason = db_res.rows[ 0 ].reason
        res.cookie('banned_reason', req.session.banned_reason)
    }

    next()
}

const routeEndSuccess = (req, res) => {
    console.log(req.session)
    res.json({ success: true })
}

module.exports = {
    verifySession: verifySession,
    verifyRank: verifyRank,
    setLoginStatus: setLoginStatus,
    setAccessRank: setAccessRank,
    setBannedStatus: setBannedStatus,
    routeEndSuccess: routeEndSuccess,
    verifySignUpData: verifySignUpData,
    commitSignUp: commitSignUp
}