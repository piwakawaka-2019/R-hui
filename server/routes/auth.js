const router = require('express').Router()

const { userExists, createUser } = require('../db/users')
const token = require('../auth/token')

router.post('/register', register, token.issue)

function register (req, res, next) {
  // needs to match json date object keys supplied by client
  const { first_name, middle_name, last_name, iwi, hapu, address, email, password } = req.body
  userExists(email)
    .then(exists => {
      if (exists) return res.status(400).send({ message: "User Name Taken" })

      createUser(first_name, middle_name, last_name, address, email, password, iwi, hapu)
      // next() in this case is token.issue and returns *2
        .then(() => next())
        .catch(err => res.status(500).send({message: "Server Error"}))
    })
    .catch(err => res.status(500).send({message: "Server Error"}))
}

router.post('/login', token.issue)

module.exports = router
