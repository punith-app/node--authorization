const express = require("express")
const mid = require("../middelware/m")
const router = express.Router();

router.get("/welcome" ,mid ,(req,res) => {
    const {userId,username,role} = req.userInfo
    res.json({
        message:"this is home page",
        
    })
})

module.exports = router 