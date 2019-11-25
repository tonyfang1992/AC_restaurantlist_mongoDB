# 餐廳一把罩3.0

此網站網羅各種美食餐廳，詳細的餐廳資訊及評價等。
新增註冊、FB登入功能
測試用帳號:
email: user1@example.com
password: 12345678
email: user1@example.com
password: 12345678


## 環境建置

新增餐廳清單的CRUD功能，並把資料存進MongoDB。

Node.js 10.15.0
Express

網頁版面也透過以下套件輔助:
> "bcryptjs": "^2.4.3",
> "body-parser": "^1.19.0",
> "connect-flash": "^0.1.1",
> "dotenv": "^8.2.0",
> "express": "^4.17.1",
> "express-handlebars": "^3.1.0",
> "express-session": "^1.17.0",
> "method-override": "^3.0.0",
> "mongoose": "^5.7.11",
> "passport": "^0.4.0",
> "passport-facebook": "^3.0.0",
> "passport-local": "^1.0.0"

### 專案安裝流程

1.首先下載專案內容，打開你的terminal，clone此專案
```
$ git clone https://github.com/tonyfang1992/AC_restaurantlist_mongoDB.git
```
2.在terminal中，進入存放此專案的資料夾
```
$ cd AC_restaurantlist_mongoDB
```
3.安裝 npm 套件
```
$ npm install 
```
4.啟動伺服器，執行app.js
```
$ npm run dev
```
5.在瀏覽器上輸入http://localhost:3000 ，即可使用


### 網頁功能
能夠透過搜尋的功能立即找到你要的餐廳，也能夠點擊查看特定餐廳的詳細資訊。
建立新的待吃清單、刪除已吃餐廳。
![image](https://github.com/tonyfang1992/AC_restaurantlist_mongoDB/blob/master/restaurantlist_mongodb.png)

## Authors

* **方正孝** - *Initial work* - [tonyFang](https://github.com/tonyfang1992)




