/**
 * This file sets up the winston logger and provides it as a convenient
 * js module export. The output format is customised to be more easily
 * readable by humans when outputted to a terminal and is made to be better
 * readable by machines when outputted to a file. Appropriate logging levels
 * have also been set to use RFC5424
 */
const winston = require('winston')

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
)

const consoleFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
        info => `${info.timestamp} - [${info.level}]: ${JSON.stringify(info.message)}, [service]: ${info.service}`
    )
)

const logger = (name) => {
    const logger = winston.createLogger({
        levels: winston.config.syslog.levels,
        level: 'info',
        defaultMeta: { service: name },
        transports: [
        new winston.transports.File({
            filename: `../../logs/${name}.log`,
            format: winston.format.combine(
                fileFormat
            )
            }),
        ],
    })

    if (process.env.NODE_ENV !== 'production') {
        logger.level = 'debug'
        logger.add(new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                consoleFormat
            )
        }))
    }

    logger.info({ 'env': process.env.NODE_ENV })

    return logger
}

module.exports = {
    config: logger
}