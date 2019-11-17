const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')   //載入 mongoose
const exphbs = require('express-handlebars')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })  //設定沿線到 mongoDB

//mongoose 連線透過mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//連線異常
db.on('error', () => {
  console.log('mongoDB error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 restaurantList model
const RestaurantlistDB = require('./models/restaurantList.js')

app.get('/', (req, res) => {
  RestaurantlistDB.find((err, restaurantlists) => {                                 // 把 Restaurantlist model 所有的資料都抓回來
    if (err) return console.error(err)
    return res.render('index', { restaurantlists: restaurantlists })  // 將資料傳給 index 樣板
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  RestaurantlistDB.find((err, restaurants) => {
    let restaurantResult = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword))
    return res.render('index', { keyword: keyword, restaurantlists: restaurantResult })
  })


})

app.listen(port, () => {
  console.log('the web is runnung')
})