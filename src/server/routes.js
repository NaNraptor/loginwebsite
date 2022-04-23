const path = require('path')

const route = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'))
    })

    //
    app.post('/signup', (req, res) => {
        
    })

    app.post('/login', (req, res) => {
        
    })

    app.get('*', function(req, res){
        res.status(404).sendFile(path.join(__dirname, '..', '..', 'public', '404.html'))
    })
}

module.exports = {
    config: route
}