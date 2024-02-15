const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    otp:{
        type: String
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type:String,
        enum: ["Admin","User","Merchant"],
        default: "User"
    },
    merchant:{
        type: Boolean,
        default: false
    },
    updated:{
        type:Date
    },
    created:{
        type:Date,
        default: Date.now
    },
    facebookId:{
        type: String
    },
    linkedinId:{
        type: String
    },

});

module.exports = mongoose.model("User",userSchema);