const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req,file,cd){
        cd(null, "uploads/")

    },
    filename:function(req,file,cd){
        cd(null,
            file.filename + "-" + Date.now() + path.extname(file.originalname)
            )
    }
})

const filter = (req,file,cd)=>{
    if(file.minetype.startsWith('image')){
        cd(null,true)
    }
    else{
        cd(new Error("it is not image"))
    }
}

module.exports = multer({
    storage:storage,
    filefilter: filter,
    limits :{
        filesize : 5*1024*1024
    }
})