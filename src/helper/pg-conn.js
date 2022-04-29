require('dotenv').config()

const { Pool } = require('pg')
const logger = require('./logger').config('postgres-db')

const pool = new Pool()

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        logger.error('Could not query the database')
        logger.debug(err)
        process.exit(-1)
    }

    logger.info(`Connected to database ${process.env.PGDATABASE} successfully`)
})

module.exports = {
    pool: pool
}