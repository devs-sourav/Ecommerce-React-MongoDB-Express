const nodemailer = require("nodemailer");
const otpTemplate = require("./otpTemplate");


let emailSend = async (email,otp) =>{



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
        html: otpTemplate(otp),// html body
    });


}

module.exports = emailSend