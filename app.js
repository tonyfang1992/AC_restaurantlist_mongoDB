const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const port = 3000
const mongoose = require('mongoose')   //載入 mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
app.use(bodyParser.urlencoded({ extended: true }));
// ...

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })  //設定沿線到 mongoDB

//mongoose 連線透過mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 設定 method-override
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: 'abc1122',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})
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
app.use('/auth', require('./routes/auths'))    // 把 auth route 加進來


app.listen(port, () => {
  console.log('the web is runnung')
})