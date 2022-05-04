require('dotenv').config()

const fs = require('fs')
const path = require('path')
const logger = require('./logger').config('client-deploy-script')

if (!process.env.PUBLIC_FOLDER) {
    logger.error('PUBLIC_FOLDER env variable not specified')
    logger.error('Could not deploy client facing code')
    process.exit(-1)
}

if (!fs.existsSync(process.env.PUBLIC_FOLDER)) {
    logger.warning(`${process.env.PUBLIC_FOLDER} does not exist, creating it now`)

    fs.mkdirSync(path.join(process.env.PUBLIC_FOLDER, 'static'), { recursive: true })
}

const ignored = ['main.js', 'utils.js', 'views.js']

fs.readdirSync('./src/client').forEach(file => {
    if (ignored.includes(file)) return
    if (file.endsWith('.jsx')) return

    const old_path = path.join(__dirname, '..', 'client', file)
    const new_path = path.join(process.env.PUBLIC_FOLDER, file.endsWith('.html') ? '' : 'static', file)

    logger.debug(`old_path: ${old_path}`)
    logger.debug(`new_path: ${new_path}`)

    fs.copyFile(old_path, new_path, (err) => {
        if (err) {
            logger.error('Could not deploy client facing code')
            process.exit(-1)
        }
        logger.debug(`Successfully deployed ${file}`)
    })
})