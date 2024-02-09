const bcrypt = require('bcrypt');
const User = require('../model/userSchema');
const emailValidation = require('../helpers/emailValidation');

let loginController = async (req, res) => {

    let { email, password } = req.body;
    let loginUser = await User.find({ email: email });

    if (!email) {
        res.send("Please enter an email");
    } else if (!password) {
        res.send("Please enter a valid password");
    } else if (!emailValidation(email)) {
        res.send("Please enter a valid email");
    } else {
        if (loginUser.length > 0) {
            bcrypt.compare(password, loginUser[0].password, function (err, result) {
                if (result) {
                    res.send({
                        message: "Login Successful",
                        name: loginUser[0].name,
                        email: loginUser[0].email,
                        emailVerified:loginUser[0].emailVerified,
                        role:loginUser[0].role,
                        _id:loginUser[0]._id
                    });
                } else {
                    res.send({ error: "Credencial is not valid" });
                }
            });
        } else {
            res.send("Credencial is not valid");
        }
    }
};

module.exports = loginController;
