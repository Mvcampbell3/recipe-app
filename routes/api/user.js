const router = require('express').Router();
const db = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
  db.User.findAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.status(500).json(err))
})

router.post('/signup', (req, res) => {
  const { firstname, lastname, password, email } = req.body;

  db.User.findOne({ where: { email } })
    .then(dbUser => {
      if (!dbUser) {
        bcrypt.hash(password, 10)
          .then(hash => {
            db.User.create({
              firstname,
              lastname,
              password: hash,
              email
            })
              .then(result => res.status(201).json(result))
              .catch(err => res.status(422).json(err))
          })
          .catch(err => {
            res.json(err)
          })
      } else {
        res.status(422).json({ msg: 'User with email already exists' })
      }
    })
    .catch(err => res.json(err))
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({ where: { email } })
    .then(dbUser => {
      // console.log(dbUser)
      if (dbUser) {
        console.log(password, dbUser.password)
        bcrypt.compare(password, dbUser.password)
          .then(match => {
            console.log(match)
            if (match) {
              const userInfo = {
                firstname: dbUser.firstname,
                lastname: dbUser.lastname,
                email: dbUser.email
              }

              const token = jwt.sign({ user: userInfo }, process.env.JWT_KEY, { expiresIn: '1h' })

              res.status(200).json({ login: true, token, user: userInfo })

            } else {
              res.status(401).json({ msg: 'password incorrect' })
            }
          })
          .catch(err => {
            console.log(err)
            res.status(401).json(err)
          })

      } else {
        res.status(404).json(err)
      }

    })
    .catch(err => {
      res.status(404).json({ msg: 'No user with that email' })
    })

})

module.exports = router;