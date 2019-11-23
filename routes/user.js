const express = require('express')
const router = express.Router()
const User = require('../models/user')
//登入
router.get('/login', (req, res) => {
  res.render('login')
})
//登入請求
router.post('/login', (req, res) => {
  res.send('login')
})
//註冊
router.get('/register', (req, res) => {
  res.render('register')
})
//註冊請求
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      //若不存在
      const newUser = new User({
        name,
        email,
        password
      })
      newUser
        .save()
        .then(user => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    }
  })
})
//登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router