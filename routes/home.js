const express = require('express')
const router = express.Router()
const RestaurantlistDB = require('../models/restaurantList')

// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')
// 設定首頁路由器
router.get('/', authenticated, (req, res) => {
  RestaurantlistDB.find((err, restaurantlists) => {                                 // 把 Restaurantlist model 所有的資料都抓回來
    if (err) return console.error(err)
    return res.render('index', { restaurantlists: restaurantlists })  // 將資料傳給 index 樣板
  })
})
module.exports = router