const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        required:true,
        unique:true,
        trim:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
})

module.exports = mongoose.model('user',UserSchema)