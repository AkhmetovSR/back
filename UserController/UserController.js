const userModel = require("../models/user")
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
}

module.exports=UserController;