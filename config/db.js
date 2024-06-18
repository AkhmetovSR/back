const mySql = require("mysql2")
const db = mySql.createPool({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "telegram"
});

module.exports=db;