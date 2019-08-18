const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

// load user model

const User = require('./../../models/Users');
const key = require('../../config/key').secreatOrKey;


// @route  GET api/users/test
// @desc   test users route
// @access public
router.get('/test', (req, res) => {
  res.json({
    "message": "users works"
  })
})

// @route  GET api/users/register
// @desc   register user
// @access public
router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: 'email already exists'
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route  GET api/users/login
// @desc   login user
// @access public

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          email: 'user email not found'
        })
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            jwt.sign(
              payload,
              key, {
                expiresIn: 3600
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              })
          } else {
            res.status(400).json({
              password: 'password incorrect'
            })
          }
        })

    })
})

// @route  GET api/users/current
// @desc   Return current user
// @access privet
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json(req.user)
})

module.exports = router;