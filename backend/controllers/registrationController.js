const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')


let registrationController = async (req,res) =>{

    let {name,email,password} = req.body

    
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets: false, specialChars: false });

    let existingUser = await User.find({email:email})
 
    if(existingUser.length == 0){
        if(!email){
            res.send("Please enter a valid email")
        }else if(!name){
            res.send("Please enter a valid email")
        }else if(!password){
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

                const transporter = nodemailer.createTransport({
                    service:"gmail",
                    auth: {
                      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: "souravacharjee360@gmail.com",
                        pass: "bdce ibsf lbka fhcc",
                    },
                });


                const info = await transporter.sendMail({
                    from: 'souravacharjee360@gmail.com', // sender address
                    to: email, // list of receivers
                    subject: "Verify Your Account", // Subject line
                    html: `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;border:1px solid #eaebed;border-radius:16px;width:100%"><tr><td style="font-family:Helvetica,sans-serif;font-size:16px;vertical-align:top;box-sizing:border-box;padding:24px"><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Ecommerce</p><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Here OTP is : </p><h2>${otp}</h2><br><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Click here for verification :</p><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;box-sizing:border-box;width:100%;min-width:100%"><tr><td align="left" style="font-family:Helvetica,sans-serif;font-size:16px;vertical-align:top;padding-bottom:16px"><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:auto"><tr><td style="font-family:Helvetica,sans-serif;font-size:16px;vertical-align:top;border-radius:4px;text-align:center;background-color:#0867ec" valign="top" align="center" bgcolor="#0867ec"><a href="https://www.w3schools.com/nodejs/nodejs_email.asp" target="_blank" style="border:solid 2px #0867ec;border-radius:4px;box-sizing:border-box;cursor:pointer;display:inline-block;font-size:16px;font-weight:700;margin:0;padding:12px 24px;text-decoration:none;text-transform:capitalize;background-color:#0867ec;border-color:#0867ec;color:#fff">Verify Your Email</a></td></tr></table></td></tr></table><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Don't share it. It's can use once</p></td></tr></table>`,// html body
                });

            });
    

        
            res.send("Data Send into Database")
        }
    }else{
        res.send("Email Already Exist.")
    }

}


module.exports = registrationController;