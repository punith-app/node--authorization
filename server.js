require('dotenv').config()
const db = require('./db/db')
const express = require("express")
const router = require("./routes/r")
const controller = require("./controllers/c")
const homerouter = require("./routes/homeroutes")
const adm = require("./routes/adminrouts")
const uploadroutes  = require("./routes/imgroutes") 
db()
const app = express()
const port = process.env.PORT 

app.use(express.json())
app.use("/api/test" , router)
app.use("/api/home" , homerouter)
app.use("/api/admin" , adm)
app.use("/api/img" , uploadroutes)

app.listen(port,()=>{
    console.log("server is running")
})