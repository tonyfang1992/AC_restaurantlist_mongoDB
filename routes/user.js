const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
//登入
router.get('/login', (req, res) => {
  res.render('login')
})
//登入請求
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})
//註冊
router.get('/register', (req, res) => {
  res.render('register')
})
//註冊請求
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  // 加入錯誤訊息提示
  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
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

        // 先用 genSalt 產生「鹽」，第一個參數是複雜度係數，預設值是 10
        bcrypt.genSalt(10, (err, salt) =>
          // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        )
      }
    })
  }
})
//登出
router.get('/logout', (req, res) => {
  req.logout()
  // 加入訊息提示
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router