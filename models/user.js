const db = require("../config/db")
const {response, query} = require("express");
const e = require("express");

class UserModel {

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    static async addUser(request) {
        let userName = request.header("login");
        let referal = request.header("referal");
        let claims = 0;
        let refLink = "https://t.me/React_WebApp_Bot/RWTG?startapp=" + userName;
        let startTimes = Math.floor(Date.now() / 1000);
        let mineTime = 14400;
        let profit = 10000;
        const addUser = [userName, claims, refLink, startTimes, mineTime, profit, false];
        const addFrens = [userName, referal];

        return new Promise(resolve => {
            db.query("insert into users (login, claims, refLink, startTimes, mineTime, profit, user_blocked) values (?, ?, ?, ?, ?, ?)", addUser, (err, result) => {
                if (!err) {
                    console.log("add")
                    resolve(result)
                }
                if (err) {
                    console.log(err)
                    resolve(["1Request error. Try again later."])
                }
            })
            // Если реферал есть, то делаем еще один запрос
            if (referal) {
                db.query("insert into frens (loginId, loginFren) values (?, ?)", addFrens, (err, result) => {
                    if (!err) {
                        console.log("Frens add")
                        resolve(result)
                    }
                    if (err) {
                        console.log(err)
                        resolve(["Frens add error"])
                    }
                })
            }
        })
    }

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    static async getUser(req, res) {
        let user_login = req.header("login");
        const sql = "select u.*, f.frens, b.boosts, fec.earns " +
            "from telegram.users as u " +
            "left join " +
            "(select f.user_login, group_concat(fren separator ', ') as frens " +
            "from telegram.frens as f " +
            "group by f.user_login having user_login = " + "\?" + ") as f " +
            "on u.login = f.user_login " +
            "left join " +
            "(select fe.user_login, group_concat(fe.id separator ', ') as earns " +
            "from " +
            "(select ec.user_login, e.id " +
            "from telegram.earncomplete as ec " +
            "left join telegram.earns as e " +
            "on ec.earn_id = e.id) as fe " +
            "group by user_login having user_login = " + "\?" + ") as fec " +
            "on u.login = fec.user_login " +
            "left join " +
            "(select b.user_login, group_concat(boost_id separator ', ') as boosts " +
            "from telegram.boostHave as b " +
            "group by user_login having user_login = " + "\?" + ") as b " +
            "on u.login = b.user_login " +
            "where u.login = " + "\?" + ";"

        const data = [user_login, user_login, user_login, user_login];


        return new Promise((resolve) => {
            db.query(sql, data, (err, result) => {
                if (!err && result.length === 0) {
                    console.log(result)
                    resolve(["asd"]);
                }                              // Если новый пользователь, возвращаем пустой массив
                if (!err && result.length !== 0) {                                               // Если существующий пользователь, возвращаем данные
                    resolve(result)
                    console.log(result)
                }
                if (err){
                    console.log(err)
                    resolve(["2Request error. Try again later."]);
                }                    // Если ошибка запроса, возвращаем сообщение ошибки
            })


        })
    }

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // static async getFrens(req, res) {
    //     let tgUserName = req.header("login");
    //     const tableFrens = "frens";
    //     const loginFren = "user_id";
    //     const sqlGetFrens = "select * from \?? where \?? = " + "\'" + tgUserName + "\';";
    //     const dataFrens = [tableFrens, loginFren];
    //
    //     return new Promise((resolve) => {
    //         db.query(sqlGetFrens, dataFrens, (err, result) => {
    //             if (!err) {
    //                 resolve(result)
    //                 console.log(result)
    //             }
    //             if (err) console.log(err)
    //         })
    //     })
    // }

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
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
        const sqlClaims = "update \?? set `claims` = " + "'" + "\?" + "'" + ", `startTimes` = " + "\'" + seconds + "\'" + " where " + "\(" + "\??" + "=" + "\'" + userId + "\'" + "\);";

        return new Promise((resolve) => {
            db.query(sqlClaims, dataClaims, (err, result) => {

                if (!err) {
                    console.log("profit+")
                    resolve(result)
                }
                if (err) console.log(err)
            })
        })
    }

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
}

module.exports = UserModel;