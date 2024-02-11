const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
var nodemailer = require('nodemailer');



let forgetPasswordController = async(req,res)=>{
    let {email} = req.body
    let existingUser = await User.find({ email: email });
    let {BASE_EMAIL,BASE_EMAIL_PASS} = process.env

    console.log(existingUser[0])

    if(existingUser.length == 0){
        res.send({error:"Credential is not valid"})
    }else{
        jwt.sign({ email:email },'123123', async function(err, token) {

            await User.findOneAndUpdate(
                { email: email }, // Find by email
                { $set: { token: token } }, // Set the new token
                { //options
                    returnNewDocument: true,
                    new: true,
                    strict: false
                }
            )
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: BASE_EMAIL,
                    pass: BASE_EMAIL_PASS
                }
            });
            await transporter.sendMail({
                from: BASE_EMAIL, // sender address
                to: existingUser[0].email, // list of receivers
                subject: "Reset your password",  // plain text body
                html: `<div style="display: flex;width: 600px;height: 200px;"> <div style="width: 50%;height: 100px;">Please change your password by click on this button <a href="http://localhost:5173/changepassword/${token}">Verify</a></div></div>`, // html body
            });
            res.send({success:"Check your email"})

        });
        
        
    }
    
}

module.exports = forgetPasswordController