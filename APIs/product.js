const productApp= require("express").Router()
const expressAynsHandler = require("express-async-handler")

productApp.get("/getproducts",expressAynsHandler(async (request,response)=>{
    let productDataObject = request.app.get("productDataObject")
    let allProducts = await productDataObject.find({}).toArray()
    response.send({message:"this is products data", payload : allProducts})
}))

productApp.get("/getproduct/:id",expressAynsHandler( async (request,response)=>{
        let id = (+request.params.id)
        let productDataObject = request.app.get("productDataObject")
        let curproduct = await productDataObject.findOne({productId : id})
        console.log(id)
        if(curproduct == null) response.send({message:"not found"})
        else response.send({message:"found",payload:curproduct})
}))




productApp.post("/createproduct",expressAynsHandler( async(request,response)=>{
    const productdataObject = request.app.get("productDataObject")
    const dataObject = request.body
    let result = await productdataObject.insertOne(dataObject)
    response.send({message:"added"})
}))
module.exports = productApp