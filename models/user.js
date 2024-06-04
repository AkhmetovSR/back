const db = require("../config/db")
const {response} = require("express");

class UserModel {
    static async addUser(request) {
        let userName = request.header("userName");
        let claim = 0;
        let ref_link = userName + " new user";
        let startTime = 0;

        const data = [userName, claim, ref_link, startTime];


        return new Promise(resolve => {
            try {
                db.query("insert into users (claim, refLink, startTime) values (?, ?, ?, ?)", data, (err, result) => {
                    console.log(err)
                })
                console.log("user add");
                // console.log('user added')
            } catch (err) {
                // console.log(err)
            }
        })
    }

    // Запрос на получение инфы пользователя с защитой от SQL инъекций
    static async getUser(req, res){
        let tgUserName = req.header("login");
        const table = "users";
        const login = "login";
        const sqlQuery = "select * from \?? where \?? = " + "\'" + tgUserName + "\';";
        const data = [table, login];

        return new Promise((resolve) => {
            db.query(sqlQuery, data, (err, result) =>{
                if(!err) {
                    // const myHeaders = new Headers();
                    // res.setHeader("login", result[0].login)
                    // res.setHeader("claims", result[0].claims)
                    // res.setHeader("refLink", result[0].refLink)
                    // res.setHeader("Access-Control-Expose-Headers","Authorization")
                    console.log(result)
                    // console.log(res.Headers)
                    resolve(result)
                };
                if(err) resolve(err);
                // console.log(result)
            })
        })


        // db.query(sqlQuery, data, (err, result) => {
        //     if(err) res.send(err); //Если ошибка запроса, то возвращаем
        //     if(result) res.send(result)
        //     console.log(err)
        //     console.log(result)
        // })
    }
}

module.exports = UserModel;
// module.exports=UserModel;
//
// const sqlQuery = "insert into person (login, password, role) values(?, ?, ?)";
// const data = ["adw", "qwerty", "ROLE_USER"];
// try {
//     db.query(sqlQuery, data);
//     console.log(sqlQuery, data)
//     console.log("added")
// } catch (err) {
//     console.log(err)
// }
