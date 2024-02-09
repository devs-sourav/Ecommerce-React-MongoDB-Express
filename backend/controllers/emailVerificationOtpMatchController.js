const User = require('../model/userSchema');



let  emailVerificationOtpMatch = async (req,res) =>{

    let {otp,email} = req.body
    let otpFound = await User.find({email})

    if(otpFound.length > 0){
        if(otp == otpFound[0].otp){

            await User.findOneAndUpdate({email:email},{otp:"", emailVerified:true})

            res.send({
                message:"OTP Matched",
                email:otpFound[0].email,
                otp:otpFound[0].otp
            })
        }else{
            res.send({
                error:"OTP Not Found",
            })
        }
    }

}

module.exports = emailVerificationOtpMatch