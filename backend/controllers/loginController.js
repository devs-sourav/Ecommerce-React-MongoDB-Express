const bcrypt = require('bcrypt');
const User = require('../model/userSchema');
const emailValidation = require('../helpers/emailValidation');

let loginController = async(req,res)=>{

    console.log(req.body)
    let {name,email,password} = req.body
    let loginUser = await User.find({email:email})

    if(!email){
        res.send("Please enter a email")
    }else if(!name){
        res.send("Please enter a valid name")
    }else if(!password){
        res.send("Please enter a valid password")
    }else if (!emailValidation(email)){
        res.send("Please enter a valid email")
    }else{

        if(loginUser.length >0){
            bcrypt.compare(password, loginUser[0].password, function(err, result) {
                if(result){
                    res.send({
                        message:"Login Successful",
                        name: loginUser.name,
                        email:loginUser.email
                    })
                }else{
                    res.send({error:"Password not match"})
                }
            });
        }else{
            res.send("Email Not Found")
        }

    }

    res.send(loginUser)

}

module.exports = loginController;