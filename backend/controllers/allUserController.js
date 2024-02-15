
let User = require("../model/userSchema")

let allUserController = async(req,res)=>{

    let userlist = await User.find({})
    res.send(userlist)

}

module.exports = allUserController