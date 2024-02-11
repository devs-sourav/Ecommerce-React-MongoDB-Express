const nodemailer = require("nodemailer");
const otpTemplate = require("./otpTemplate");


let emailSend = async (email,otp) =>{

    let {BASE_EMAIL,BASE_EMAIL_PASS} = process.env

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: BASE_EMAIL,
            pass: BASE_EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: BASE_EMAIL, // sender address
        to: email, // list of receivers
        subject: "Verify Your Account", // Subject line
        html: otpTemplate(otp,email),// html body
    });


}

module.exports = emailSend