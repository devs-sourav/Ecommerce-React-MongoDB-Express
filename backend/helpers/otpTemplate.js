


let otpTemplate = (otp)=>{
    
    return  `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;border:1px solid #eaebed;border-radius:16px;width:100%"><tr><td style="font-family:Helvetica,sans-serif;font-size:16px;vertical-align:top;box-sizing:border-box;padding:24px"><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Ecommerce</p><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Here OTP is : </p><h2>${otp}</h2><br><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Click here for verification :</p><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;box-sizing:border-box;width:100%;min-width:100%"><tr><td align="left" style="font-family:Helvetica,sans-serif;font-size:16px;vertical-align:top;padding-bottom:16px"><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:auto"><tr><td style="font-family:Helvetica,sans-serif;font-size:16px;vertical-align:top;border-radius:4px;text-align:center;background-color:#0867ec" valign="top" align="center" bgcolor="#0867ec"><a href="https://www.w3schools.com/nodejs/nodejs_email.asp" target="_blank" style="border:solid 2px #0867ec;border-radius:4px;box-sizing:border-box;cursor:pointer;display:inline-block;font-size:16px;font-weight:700;margin:0;padding:12px 24px;text-decoration:none;text-transform:capitalize;background-color:#0867ec;border-color:#0867ec;color:#fff">Verify Your Email</a></td></tr></table></td></tr></table><p style="font-family:Helvetica,sans-serif;font-size:16px;font-weight:400;margin:0;margin-bottom:16px">Don't share it. It's can use once</p></td></tr></table>`
}

module.exports = otpTemplate