const mySql = require("mysql2")
const db = mySql.createPool({
    host: "localhost:3303",
    user: "root",
    password: "Tgdatabase1!",
    database: "telegram"
});

module.exports=db;