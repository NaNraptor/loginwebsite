const path = require('path')

const route = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(process.env.PUBLIC_FOLDER, 'index.html'))
    })

    //
    app.post('/signup', (req, res) => {
        
    })

    app.post('/login', (req, res) => {
        
    })

    app.get('*', (req, res) => {
        res.status(404).sendFile(path.join(process.env.PUBLIC_FOLDER, '404.html'))
    })
}

module.exports = {
    config: route
}