let cartApp = require("express").Router()
let expressAynsHandler = require("express-async-handler")
const cartValidate = require("./middlewares/cartValidate")

cartApp.post("/addproduct",cartValidate,expressAynsHandler( async(request,response)=>{
    let cardDataObject = request.app.get("cardDataObject")
    data = request.body
    await cardDataObject.insertOne(data)
    console.log(data)
    response.send({message:"success"})
}))


cartApp.get('/getproducts/:username',expressAynsHandler( async(request,response)=>{
    let cardDataObject = request.app.get("cardDataObject")
    curuser= request.params.username
    console.log(curuser)
    let products = await cardDataObject.find({'usename':curuser}).toArray()
    console.log(products)
    response.send({message:"success",payload:products})


}))
module.exports = cartApp