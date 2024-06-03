const userModel = require("../models/user")
class UserController{

    static async addUser(req, res){
       let result = await userModel.addUser(req);
       if(result)
           res.send(result)
    }
}

module.exports=UserController;