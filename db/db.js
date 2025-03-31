const mongoose = require("mongoose")

const connectiontodatabase = async()=>{
    try{
        await mongoose.connect(process.env.data)
        console.log("connected")
    }
    catch(e){
        console.log(e)

    }
}
module.exports = connectiontodatabase