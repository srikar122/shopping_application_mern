const userApp = require("express").Router()
const expressAynsHandler = require("express-async-handler")
const bCryptjs = require("bcryptjs") 
const jwt = require("jsonwebtoken")
const validateUser = require("./middlewares/validateUser")
// signup
userApp.post("/createuser",expressAynsHandler(async (request,response)=>{

    let userDataObject = request.app.get("userDataObject")
    let userData = request.body
    let dbUser = await userDataObject.findOne({username:userData.username})
    if(dbUser !== null){
        response.send({message:"username is already taken"})

    }
    else{
        let pass = userData.password
        let hashpass = await bCryptjs.hash(pass,5)
        userData.password = hashpass
        let result = await userDataObject.insertOne(userData)
        response.send({message:"success"}) 
    }
}))

userApp.get("/getusers", expressAynsHandler( async (request,response)=>{
    let userDataObject = request.app.get("userDataObject")
    users = await userDataObject.find().toArray()
    response.send({message:"users data is",payload:users})
}))


// login
userApp.post("/login",expressAynsHandler(async (request,response)=>{
    let userDataObject = request.app.get("userDataObject")
    let curuser = request.body
    let dbObj = await userDataObject.findOne({username : curuser.username})
    // console.log(dbObj)

    if(dbObj == null){
        response.send({message:"username invalid"})
    }

    else{
    let  comp = await bCryptjs.compare(curuser.password,dbObj.password)
        if(!comp){
            response.send({message:"invalid password"})

        }
        else{
            webToken = jwt.sign({username:curuser.username},"asdfghjkl",{expiresIn:10000})
            response.send({message:"success",token:webToken,user:dbObj})
        }
    }
}))

userApp.get("/validate",validateUser,expressAynsHandler(async(requset,response)=>{
    response.send({message:"success"})
}))
module.exports = userApp