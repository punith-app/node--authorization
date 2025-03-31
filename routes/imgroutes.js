const express = require("express")
const authcheck = require("../middelware/m")
const admincheck = require("../middelware/auth")
const upload = require("../middelware/imguplo")
const {uploadimg, fetchallimg , deletimg} = require("../controllers/imgcontroller")

const router = express.Router()


router.post("/upload" , authcheck , admincheck, upload.single('image') , uploadimg)


router.get("/get" , authcheck , fetchallimg)

router.delete("/:id" , authcheck , admincheck , deletimg)

module.exports = router