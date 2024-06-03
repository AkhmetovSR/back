const express = require('express');
const router = require('express').Router();
const userController = require("../UserController/UserController")
const cors = require("cors");
const PORT = 8888;
const app = express(); //Express - веб фреймворк для node.js
app.listen(PORT) // Слушаем порт 8888 "V"
app.use(cors({cors, optionsSuccessStatus: 200}))

app.post("/addUser", userController.addUser);

module.exports = router;