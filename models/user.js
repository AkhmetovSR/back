const db=require("../config/db")
class UserModel{
    static async getUsers(){
        return new Promise(resolve => {
            db.query("select * from person", [], (error, result) =>{
                if(!error)
                    resolve(result)
            })
        })
    }
}

module.exports=UserModel;

