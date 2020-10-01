const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

module.exports = {
  name: 'auth1cookie',
  secret: process.env.SECRET || 'its a secret to everyone',
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure: false,
    httpOnly: true,

  },
  resave: false,
  saveUnitialized: false,


  store: new knexSessionStore({
    knex: require('./data/connection'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 60 * 060 * 1000
  })
}