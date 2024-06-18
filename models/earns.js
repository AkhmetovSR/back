const db = require("../config/db")
const {response, query} = require("express");
const e = require("express");

class earnsModel {
    static async getEarns(req, res){
        let earns = "telegram.earns"
        return new Promise(resolve => {
            db.query("select * from " + earns, (err, result) => {
                if(!err) resolve(result)
                if(err) resolve("Earns are download. Please try again")
            })
        })
    }

    static async EarnComplete(req, res){
        let user_login = req.header("login");
        let earn_id = req.header("earn_id");
        let claims = req.header("claims");
        let tName = "telegram.earncomplete"

        const sqlEarnComplete = "insert into telegram.earncomplete (user_login, earn_id) values ("+ "\'" + user_login + "\'" + ", " + earn_id + ")";
        const data = [tName];
        const sqlUserEarnClaim = "update telegram.users set claims = " + claims + " where login = " + "\'" + user_login + "\'" +";";

        return new Promise(resolve => {
            db.query(sqlEarnComplete, (err, result) => {
                if(!err){
                    console.log("Earncomplete add")
                    db.query(sqlUserEarnClaim, (err, result) => {
                        if(!err) {
                            console.log("Earn user claim ok")
                            resolve("Earn user claim ok")
                        }
                        if(err) {
                            console.log(err)
                        }
                    })
                    resolve(result)
                }
                if(err) {
                    console.log(err)
                    resolve("Earn not completed")
                }
            })
        })
    }
}
module.exports = earnsModel;