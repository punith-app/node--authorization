const express = require("express")
const mid = require("../middelware/m")
const admincheck = require("../middelware/auth")
const router = express.Router()

router.get("/welcome" ,mid,admincheck, (req,res)=>{
    res.json({
        message:"this is admin page"
    })
})

module.exports = router