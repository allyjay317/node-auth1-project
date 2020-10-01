const express = require('express')
const session = require('express-session')
const sessionConfig = require('./sessionConfig')

const server = express()

const authRouter = require('./auth/authRouter')



server.use(session(sessionConfig))
server.use(express.json())
server.use(require('helmet')())

server.use('/api/', authRouter)

server.get('/', (req, res) => {
  res.send('<h1>Auth 1</h1>')
})

server.use(require('./error-route'))
module.exports = server