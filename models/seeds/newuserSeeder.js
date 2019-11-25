const restaurantList = require('../../restaurant.json')
const mongoose = require('mongoose')
const restaurant_mongodbSchema = require('../restaurantList.js')

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
  let restaurantresults = restaurantList.results

  for (var i = 0; i < restaurantresults.length; i++) {
    restaurant_mongodbSchema.create({
      name: restaurantresults[i].name,
      name_en: restaurantresults[i].name_en,
      category: restaurantresults[i].category,
      image: restaurantresults[i].image,
      location: restaurantresults[i].location,
      phone: restaurantresults[i].phone,
      google_map: restaurantresults[i].google_map,
      rating: restaurantresults[i].rating,
      description: restaurantresults[i].description
    })
  }

  console.log('done')

})