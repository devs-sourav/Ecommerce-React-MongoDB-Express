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
            bcrypt.hash(password, 10,async function(err, hash) {
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
                    html: `<div style="display: flex;width: 600px;height: 200px;"> <div style="width: 50%;height: 100px;">Please Verify your email by click on this button <a href="https://www.figma.com/">Verify</a>${otp}</div></div>`,// html body
                });
            });
    

        
            res.send("Data Send into Database")
        }
    }else{
        res.send("Email Already Exist.")
    }
 
    


}


module.exports = registrationController;