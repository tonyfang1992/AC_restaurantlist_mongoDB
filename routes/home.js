const express = require('express')
const router = express.Router()
const RestaurantlistDB = require('../models/restaurantList')
// 設定首頁路由器
router.get('/', (req, res) => {
  RestaurantlistDB.find((err, restaurantlists) => {                                 // 把 Restaurantlist model 所有的資料都抓回來
    if (err) return console.error(err)
    return res.render('index', { restaurantlists: restaurantlists })  // 將資料傳給 index 樣板
  })
})
module.exports = router