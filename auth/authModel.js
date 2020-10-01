const db = require('knex')(require('../knexfile').development)


function find() {
  return db('users').select('id', 'username')
}

function findBy(user) {
  return db('users')
    .where({
      username: user.username
    })
    .first()
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(res => {
      return findBy(user)
    })
}


module.exports = {
  find,
  findBy,
  insert
}