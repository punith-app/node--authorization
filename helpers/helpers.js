const cloudnary = require("../config/cloudnary")

const uploadtocloud = async(filepath)=>{
    try{

        const finalupload = await cloudnary.uploader.upload(filepath)
        
        return{
            url :finalupload.secure_url,
            publicId :finalupload.public_id
        } 
    }

    catch(e){
        console.log("error while uploading",e)
    }

}

module.exports = {uploadtocloud}