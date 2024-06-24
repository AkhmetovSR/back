const mySql = require("mysql2")
const db = mySql.createPool({
    host: "172.17.0.2",
    user: "root",
    password: "Tgdatabase1!",
    database: "tg"
});

module.exports=db;