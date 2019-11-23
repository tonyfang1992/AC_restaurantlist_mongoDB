const express = require('express')
const router = express.Router()
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
  res.send('register')
})
//登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router