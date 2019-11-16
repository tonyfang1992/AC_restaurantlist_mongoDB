const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')   //載入 mongoose

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })  //設定沿線到 mongoDB

//mongoose 連線透過mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongoDB error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello word!')
})

app.listen(port, () => {
  console.log('the web is runnung')
})