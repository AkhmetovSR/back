const mySql = require("mysql2")
const {query} = require("express");
const db = mySql.createPool({
    host: "localhost",
    user: "root",
    password: "database",
    database: "wedding"
});


    const sqlQuery = "insert into person (login, password, role) values(?, ?, ?)";
    const data = ["adw", "qwerty", "ROLE_USER"];
    try {
        db.query(sqlQuery, data);
        console.log(sqlQuery, data)
        console.log("added")
    } catch (err) {
        console.log(err)
    }


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