require('dotenv/config')
const server = require('json-server')
const middleware = server.defaults()

const app = server.create()
app.use(middleware)
app.listen()
