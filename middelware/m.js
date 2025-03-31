const jwt = require("jsonwebtoken")

const middel = (req,res,next)=>{
const head = req.headers["authorization"]
console.log(head)   
const token = head  && head.split(" ")[1]
if(!token){
    return res.status(401).json({
        message:"you should login "
    })
}
try{
const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
console.log(decode)
req.userInfo = decode
next()
}
catch(e) {
    return res.status(401).json({
        message: e.name === "TokenExpiredError"
            ? "Session expired, please log in again"
            : "Invalid token, please log in"
    });
}

}
module.exports = middel