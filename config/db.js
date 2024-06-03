const mySql = require("mysql2")
const {query} = require("express");
const db = mySql.createPool({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "telegram"
});




// const sqlQuery = "insert into person (login, password) values(?, ?)";
// const data = ["iam", "qwerty"];
// db.query(sqlQuery, data, function (err, result){
//     if(err){console.log(err);}
//     else{console.log("user added");}
// })

// db.getConnection(() => {
//         try {
//             console.log('database connects123');
//         } catch (err) {
//             console.log('not connect to db' + err)
//         }
//     }
// )

module.exports=db;