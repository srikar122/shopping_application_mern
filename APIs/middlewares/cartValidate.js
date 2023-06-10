let exp = require("express")
let jsw = require("jsonwebtoken")

let cartValidate= (request,response,next)=>{
    let bearerToken = request.headers.authorization
    if(bearerToken == null){
        response.send("invalid bearer")
    }
    let token = bearerToken.split(" ")[1]
    if(token == null){
        response.send({message:"invalid user"})
    }
    try{
        jsw.verify(token,"asdfghjkl")
        next()
    }
    catch(err){
        response.send({message:"session expired"})
    }
}
module.exports = cartValidate

