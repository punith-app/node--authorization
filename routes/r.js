const express = require('express')

const {registeruser,loginuser, changepass} = require("../controllers/c")
const middle = require("../middelware/m")
const router  = express.Router()

router.post("/register" , registeruser)
router.post("/login", loginuser)
router.post("/change-pass" , middle , changepass)
module.exports = router