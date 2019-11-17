// routes/todo.js
const express = require('express')
const router = express.Router()
const RestaurantlistDB = require('../models/restaurantList')

//新增新的餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  // 建立 restaurants model 實例

  const restaurant = new RestaurantlistDB({
    name: req.body.name,    // name 是從 new 頁面 form 傳過來
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  // 存入資料庫
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', (req, res) => {
  RestaurantlistDB.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err)
    return res.render('show', { restaurants: restaurants })
  })
})

// 修改 Todo 頁面
router.get('/:id/edit', (req, res) => {
  RestaurantlistDB.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})
// 修改 Todo
router.put('/:id/edit', (req, res) => {
  RestaurantlistDB.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除 Todo
router.delete('/:id/delete', (req, res) => {
  RestaurantlistDB.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 設定 /todos 路由
module.exports = router