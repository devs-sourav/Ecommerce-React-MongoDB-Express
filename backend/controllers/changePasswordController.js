
let User = require("../model/userSchema")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let changePasswordController = (req,res)=>{
    let {token,password} = req.body
    console.log(token,password)

    jwt.verify(token, '123123', function(err, decoded) {
        // console.log(decoded.email) 
        bcrypt.hash(password, 10, async function(err, hash) {
            await User.findOneAndUpdate(
                {email:decoded.email},
                { $set:{
                    "password":hash,
                    "token": "",
                    },
                },
                { //options
                    returnNewDocument: true,
                    new: true,
                    strict: false
                }
            )
        })

        res.send({success:"Password Changed"})

    });


}

module.exports = changePasswordController