const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')   //載入 mongoose
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser');
// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// ...

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

//新增新的餐廳
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:id', (req, res) => {
  RestaurantlistDB.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err)
    return res.render('show', { restaurants: restaurants })
  })
})

// 修改 Todo 頁面
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})
// 修改 Todo
app.post('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo')
})
// 刪除 Todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})



app.listen(port, () => {
  console.log('the web is runnung')
})