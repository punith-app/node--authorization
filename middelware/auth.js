const isadmin = (req,res,next)=>{
    if(req.userInfo.role !== "admin"){
        return res.status(403).json({
            message:"y r not admin"
        })

    }
    next()
}
module.exports = isadmin