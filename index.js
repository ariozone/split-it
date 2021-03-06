require('dotenv/config')
const server = require('json-server')
const middleware = server.defaults()
const router = server.router('db.json')
const app = server.create()
app.use(middleware)
app.use(router)
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
