const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')   //載入 mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
app.use(bodyParser.urlencoded({ extended: true }));
// ...

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })  //設定沿線到 mongoDB

//mongoose 連線透過mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 設定 method-override
app.use(methodOverride('_method'))
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



app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  RestaurantlistDB.find((err, restaurants) => {
    let restaurantResult = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword))
    return res.render('index', { keyword: keyword, restaurantlists: restaurantResult })
  })


})
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurantlist_routes'))
app.use('/users', require('./routes/user'))


app.listen(port, () => {
  console.log('the web is runnung')
})