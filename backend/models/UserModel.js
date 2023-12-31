const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        trim : true,
        unique : true
    },
    email : {
        type : String,
        required: true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required: true,
        trim : true
    }  
}, {timestamp : true})

module.exports = mongoose.model('Users', userSchema);