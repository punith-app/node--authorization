const img = require("../schema/img")
const {uploadtocloud} = require("../helpers/helpers")
const fs = require('fs')
const cloudnary = require("../config/cloudnary")

const uploadimg = async (req,res)=>{
try{
    if(!req.file){
        res.status(400).json({
            message:"file was missing"
        })
    }

    const {url,publicId} = await uploadtocloud(req.file.path)

    const newimg = new img({
        url,
        publicId,
        uploadby: req.userInfo.userId
    })

    await newimg.save()
    fs.unlinkSync(req.file.path)

    res.status(201).json({
        message:"image uploaded sucussfully",
        image:newimg
    })
}
catch(e){
    console.log(e)
    res.status(500).json({
        message:"server error"
    })
}

}

const fetchallimg = async(req,res)=>{
    try{
        const images = await img.find({})
        if(images){
            return res.status(200).json({
                message:"all images are ",
                data:images
            })
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:"error in server"
        })
    }
}

const deletimg = async (req,res)=>{
    try{
        const imgid = req.params.id
        const userId =  req.userInfo.userId 

        const image = await img.findById(imgid)
        if(!image){
             return res.status(404).json({
                message:" img not found"
            })
        }
        if(image.uploadby.toString() !==userId){
            return res.status(403).json({
                message:"error y r not uploaded one"
            })
        }
        await cloudnary.uploader.destroy(image.publicId)

        await img.findByIdAndDelete(imgid)
        res.status(200).json({
            message:"deleted sucussfully"
        })

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            message:"error while deleting"
        })
    }
}

module.exports = {uploadimg , fetchallimg, deletimg}