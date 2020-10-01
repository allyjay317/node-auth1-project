module.exports = function (req, res, next) {
  console.log(`req.session: ${req.session}, req.session.user: ${req.session.user}`)
  if (req.session && req.session.user) {
    next()
  }
  else {
    next({
      apiCode: 403, apiMessage: 'You shall not pass!'
    })
  }
}