const router = require('express').Router()

const db = require('./authModel')
const bcrypt = require('bcryptjs')

const restricted = require('./restricted-route')

router.use('/users/', restricted)


router.post('/register', async (req, res, next) => {
  const user = req.body
  console.log(user)
  try {
    const hashed = bcrypt.hashSync(user.password, 14)
    console.log(hashed)
    user.password = hashed
    const createdUser = await db.insert(user)
    if (createdUser) {
      req.session.user = createdUser
      res.status(201).json(user)
    }
    else {
      next({ apiCode: 500, message: 'Could not register user' })
    }
  }
  catch (err) {
    next({ apiCode: 500, message: 'Could not register user' })
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await db.findBy({ username })
    const matches = bcrypt.compareSync(password, user.password)
    if (matches && user) {
      req.session.user = user
      res.status(200).json({ message: `Logged in` })
    }
    else {
      next({ apiCode: 401, apiMessage: 'You shall not pass!' })
    }
  }
  catch (err) {
    next({ apiCode: 500, message: 'error logging in' })
  }
})

router.get('/users', (req, res, next) => {
  db.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      next({ apiCode: 500, apiMessage: 'Sorry, we had an issue getting users' })
    })
})



module.exports = router