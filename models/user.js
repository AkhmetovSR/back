const db = require("../config/db")
const {response, query} = require("express");
const e = require("express");

class UserModel {

    //________________________________________________________________________________________________________________________________________________________________
    static async addUser(request) {
        let userName = request.header("login");
        let claims = 0;
        let refLink = "https://t.me/React_WebApp_Bot/RWTG?startapp=" + userName;
        let startTimes = Math.floor(Date.now() / 1000);
        let mineTime = 14400;
        let profit = 10000;
        const data = [userName, claims, refLink, startTimes, mineTime, profit];

        return new Promise(resolve => {
            db.query("insert into users (login, claims, refLink, startTimes, mineTime, profit) values (?, ?, ?, ?, ?, ?)", data, (err, result) => {
                if(!err) {
                    console.log("add")
                    resolve(result)
                }
                if(err) {
                    console.log(err)
                    resolve(["1Request error. Try again later."])
                }
            })
        })
    }

    //________________________________________________________________________________________________________________________________________________________________
    static async getUser(req, res) {
        let tgUserName = req.header("login");
        const table = "users";
        const login = "login";
        const sqlGetUserInfo = "select * from \?? where \?? = " + "\'" + tgUserName + "\';";
        const dataUser = [table, login];

        return new Promise((resolve) => {
            db.query(sqlGetUserInfo, dataUser, (err, result) => {
                if (!err && result.length === 0) resolve([]);                             // Если новый пользователь, возвращаем пустой массив
                if (!err && result.length !== 0) resolve(result)                                // Если существующий пользователь, возвращаем данные
                if (err) resolve(["2Request error. Try again later."]);                     // Если ошибка запроса, возвращаем сообщение ошибки
            })
        })
    }

    //________________________________________________________________________________________________________________________________________________________________
    static async claimProfit(req, res) {
        const seconds = Math.floor(Date.now() / 1000);
        const userId = req.header("id");
        const profit = req.header("profit");
        const claims = req.header("claims");
        const id = "id";
        const table = "users";
        const claimsProfit = Number(claims) + Number(profit);
        console.log(profit, claims, claimsProfit)
        const dataClaims = [table, claimsProfit, id]
        const sqlClaims = "update \?? set `claims` = " + "'" + "\?" + "'" + ", `startTimes` = " + "\'" + seconds + "\'" + " where " + "\(" + "\??" + "="  + "\'" + userId + "\'" + "\);";

        return new Promise((resolve) => {
            db.query(sqlClaims, dataClaims, (err, result) => {

                if(!err) {
                    console.log("profit+")
                    resolve(result)
                }
                if(err) console.log(err)
            })
        })
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

// const seconds = Math.floor(Date.now() / 1000);             // Текущее время в секундах
// const startTimes = result[0].startTimes;                      // Время прошлого старта майнинга
// const mineTime = result[0].mineTime                           // Время майнинга
// let time = seconds - startTimes                               // Текущее время майнинга
// const claims = result[0].claims                               // Сколько намайнено
// const profit = result[0].profit                               // Сколько майнится за период
// const userId = result[0].id

// if (time > mineTime) {                                         // Если период майнинга завершился
//     const claimsProfit = claims + profit;                      // Полученный профит
//     let id = "id";
//     const dataClaims = [table, claimsProfit, id, userId]
//     const sqlClaims = "update \?? set `claims` = " + "'" + "\?" + "'" + " where " + "\??" + "=" + "\(" + "\'" + userId + "\'" + "\);";
//     db.query(sqlClaims, dataClaims, (err, res) => {
//         if (!err) {
//             console.log("claim done!")
//             resolve(result)
//         }
//         if (err) console.log(err)
//     })
// }
// if (time < mineTime) resolve(result)                             // Если период майнинга НЕ завершился


// db.query(sqlQuery, data, (err, result) => {
//     if(err) res.send(err); //Если ошибка запроса, то возвращаем
//     if(result) res.send(result)
//     console.log(err)
//     console.log(result)
// })
