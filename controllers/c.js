const User = require("../schema/s")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const registeruser = async (req,res) =>{
    try{
        const {username,password,role} = req.body
        console.log(req.body)

        const checker =  await User.findOne({username})
        if(checker){
            return res.status(400).json({
                message:"user is aldready exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash( password,salt)

        const newdata = new User({
            username,
            password:hashedPassword,
            role: role || "user" 
        })
        await newdata.save()
            res.status(201).json({
                message:"created"
            })

           
        

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:"server error"
        })

    }

}


const loginuser = async (req,res) =>{
    try{
        const {username,password} = req.body
        const check = await User.findOne({username})
        if(!check){
           return  res.status(400).json({
                message:"user not exist first register"
            })
        }
        const passchecker = await bcrypt.compare(password,check.password)
        if(!passchecker){
             return res.status(400).json({
                message:"notmatch"
            })
        }
       

        const accessToken = jwt.sign({
            userId: check.id,
            username:check.username,
            role:check.role

        }, 
        process.env.JWT_SECRET_KEY,
        {
            expiresIn : "15m"
        })
        res.status(200).json({
            message:"sucussufully login ",
            accessToken
        })
    }
    catch(e){
        console.log(e)
        console.log("server error")

    }

}

const changepass = async(req,res)=>{
try{
    const userId =req.userInfo.userId
    const {oldpass,newpass} = req.body

    const user = await User.findById(userId)
    if(!user){
        return res.status(400).json({
            message:"user is not there"
        })
    }

    const passmatch = await bcrypt.compare(oldpass ,user.password)
    if(!passmatch){
        return res.status(400).json({
            message:"pass not matched"
        })
    }
    const salt = await bcrypt.genSalt(5)
    const newpassword = await bcrypt.hash(newpass , salt)

    user.password = newpassword
    await user.save()

    res.status(200).json({
        message:"password changed sucussfully"
    })
}
catch(e){
    console.log(e)
    res.status(500).json({
        message:"error server"
    })
}
}

module.exports = {registeruser,loginuser , changepass}