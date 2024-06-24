const express = require('express');
const router = require('express').Router();
const userController = require("../UserController/UserController")
const cors = require("cors");
const PORT = 8888;
const app = express(); //Express - веб фреймворк для node.js
app.listen(PORT) // Слушаем порт 8888 "V"
app.use(cors({cors, optionsSuccessStatus: 200}))

app.post("/", userController.getUser);
app.post("/addNewUserAndStartMining", userController.addUser);
app.post("/claimProfit", userController.claimProfit);
app.post("/getEarns", userController.getEarns);
app.post("/EarnComplete", userController.EarnComplete);

module.exports = router;