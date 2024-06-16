const userModel = require("../models/user")
const earnsModel = require("../models/earns")

class UserController{

    static async addUser(req, res){
       let result = await userModel.addUser(req);
       if(result)
           res.send(result)
    }

    static async getUser(req, res){
        let result = await userModel.getUser(req, res);
        if(result)
            res.send(result)
    }

    // static async getFrens(req, res){
    //     let result = await userModel.getFrens(req, res);
    //     if(result)
    //         res.send(result)
    // }

    static async claimProfit(req, res){
        let result = await userModel.claimProfit(req, res);
        if(result)
            res.send(result)
    }

    static async getEarns(req, res){
        let result = await earnsModel.getEarns(req, res);
        if(result)
            res.send(result)
    }

    static async EarnComplete(req, res){
        let result = await earnsModel.EarnComplete(req, res);
        if(result)
            res.send(result)
    }
}

module.exports=UserController;