
let  emailVerificationOtpMatch = async (req,res) =>{

    res.send(req.body)
    let otpFound = await User.find({email})

    if(otpFound.length > 0){
        if(otp == otpFound[0].otp){
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