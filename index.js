import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import fileUpload from "express-fileupload";

const PORT = 5000;
// const DB_URL = `mongodb+srv://someUser:somePassword@cluster0.wnvhx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const DB_URL = `mongodb://someUser:somePassword@cluster0-shard-00-00.wnvhx.mongodb.net:27017,cluster0-shard-00-01.wnvhx.mongodb.net:27017,cluster0-shard-00-02.wnvhx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-uz05ki-shard-0&authSource=admin&retryWrites=true&w=majority`

const app = express()

// регистрируем все midleware
app.use( express.json() )    // express по умолчанию не может обработать JSON формат, это нужно явно указать
                             // иначе console.log(req.body) выдаст undefined
app.use(express.static("static"))  /*  это для того, чтобы GET запрос по урлу
                                      "http://localhost:5000/703b1262-14b4-4c76-9e20-db37485ce534.jpg"
                                       отдавал нам картинку       */
app.use(fileUpload({}))  // регистрируем ещё один midleware для удобной загрузки файлов
app.use("/api", router)  // регистрируем роутер, который будет отрабатывать по адресу "/api". Роутер регистрируем последним


// app.get(`/`, (req, res) => {
//   console.log("query:", req.query)      // получить объект с параметрами запроса, если пользователь введёт URL
//                                         // "http://localhost:5000/?test=1&name=Oleg&age=45", то получим объект
//                                         // { test: '1', name: 'Oleg', age: '45' }
//   res.status(200).json("Server works")
// })


async function startApp() {
  try {
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})   // подключение к БД
    app.listen(PORT, () => {                          // запуск сервера
      console.log(`Server started on port ${PORT}`)
    })
  } catch(e) {
    console.log(e)
  }
}

startApp()
