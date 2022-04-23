const fs = require('fs')
const path = require('path')
const logger = require('./logger').config('client-deploy-script')

const ignored = ['main.js']

fs.readdirSync('./src/client').forEach(file => {
    if (ignored.includes(file)) return
    if (file.endsWith('.jsx')) return

    const old_path = path.join(__dirname, '..', 'client', file)
    const new_path = path.join(__dirname, '..', '..', 'public', file.endsWith('.html') ? '' : 'static', file)

    logger.debug(`old_path: ${old_path}`)
    logger.debug(`new_path: ${new_path}`)

    fs.copyFile(old_path, new_path, (err) => {
        if (err) {
            logger.error('Could not deploy client facing code')
            return
        }
        logger.debug(`Successfully deployed ${file}`)
    })
})