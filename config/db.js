const mySql = require("mysql2")
const db = mySql.createPool({
    host: "localhost",
    user: "root",
    password: "database",
    database: "telegram"
});

module.exports=db;