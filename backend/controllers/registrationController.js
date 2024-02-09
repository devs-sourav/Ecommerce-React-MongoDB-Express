const bcrypt = require('bcrypt');
const emailValidation = require('../helpers/emailValidation');
const emailSend = require('../helpers/emailSend');
const otpGenerator = require('otp-generator')
const User = require('../model/userSchema');

let registrationController = async (req,res) =>{

    let {name,email,password} = req.body

    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets: false, specialChars: false });


    let existingUser = await User.find({email:email})
 
    if(existingUser.length == 0){
        if(!email){
            res.send("Please enter a email")
        }else if(!name){
            res.send("Please enter a valid name")
        }else if(!password){
            res.send("Please enter a valid password")
        }else if(!emailValidation(email)){
            res.send("Please enter a valid email")
        }else{

            bcrypt.hash(password, 10, async function(err, hash) {
                // Store hash in your password DB.
                let user = new User({
                    name:name,
                    email:email,
                    password:hash,
                    otp:otp
                })
                
                user.save()
                
                emailSend(email,otp)

                // setTimeout(async()=>{
                //     console.log("OTP Deleted")

                //     let otpStore = await User.findOneAndUpdate(
                //         {email}, 
                //         { otp: "" },
                //         {new:true});
                // },30000)

                res.send({
                    success: "Registration Successful",
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    emailVerified:user.emailVerified,
                    _id:user._id
                })

            });
    
        }
    }else{
        res.send("Email Already Exist.")
    }

}


module.exports = registrationController;