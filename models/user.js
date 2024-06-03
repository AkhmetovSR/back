const db = require("../config/db")

class UserModel {
    static async addUser(request) {
        let userName = request.header("userName");
        // console.log(userName);
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
