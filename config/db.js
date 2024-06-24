const mySql = require("mysql2")
const db = mySql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "qwerty",
    database: "telegram"
});

module.exports=db;