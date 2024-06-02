const express = require("express");
const cors = require("cors");
const PORT = 8888;
const app = express(); //Express - веб фреймворк для node.js
const myDb = require('./config/db');
const {query} = require("express");
const rout = require('./routes/router');

app.listen(PORT) // Слушаем порт 8888 "V"
app.use(cors({origin: "https://localhost:3000", optionsSuccessStatus: 200}))
app.post("/earn", (req, res) => {
    console.log(req.header("user"))
    res.status(200).json("its work") //Отправляем статус 200 и вызываем функцию json, в которую можно передать любые данные - они будут возвращены на клиент.
}) // 1 параметр - Endpoint по которому выполняется запрос, 2 параметр - анонимная функция с параметрами (req-запрос и res-ответ) котороя будет выполняться при данном запросе
