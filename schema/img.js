const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    publicId : {
        type:String,
        required:true
    },
    uploadby: {
        type :mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})

module.exports = mongoose.model('Image',ImageSchema)