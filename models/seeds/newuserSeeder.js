const restaurantList = require('../../restaurant.json')
const mongoose = require('mongoose')
const user = require('../../user.json')
const restaurant_mongodbSchema = require('../restaurantList.js')
const user_mongodbSchema = require('../user.js')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })  //設定沿線到 mongoDB

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
  let users = user.users

  for (let i = 0; i < users.length; i++) {
    const newUser = new user_mongodbSchema({
      email: users[i].email,
      password: users[i].password
    })

    bcrypt.genSalt(10, (err, salt) =>

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser
          .save()
          .then(user => {
            for (let j = i * 3; j < (i + 1) * 3; j++) {
              restaurant_mongodbSchema.create({
                name: restaurantresults[j].name,
                name_en: restaurantresults[j].name_en,
                category: restaurantresults[j].category,
                image: restaurantresults[j].image,
                location: restaurantresults[j].location,
                phone: restaurantresults[j].phone,
                google_map: restaurantresults[j].google_map,
                rating: restaurantresults[j].rating,
                description: restaurantresults[j].description,
                userId: user._id
              })
            }
          })
          .catch(err => console.log(err))
      })
    )
  }

  console.log('done')

})