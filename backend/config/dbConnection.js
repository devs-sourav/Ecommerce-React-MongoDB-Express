const mongoose = require('mongoose');

function dbConnection(){

    const {USER_NAME,DATABASE_NAME,PASSWORD} = process.env

    console.log(USER_NAME,DATABASE_NAME,PASSWORD)
    mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.nv3e8vk.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('Database Connected!'));

} 
//mongodb+srv://souravacharjee360:pwyzjpOIj5mQLD9p@cluster0.nv3e8vk.mongodb.net/EcommerceOrebi?retryWrites=true&w=majority
module.exports = dbConnection