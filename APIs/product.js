const productApp= require("express").Router()
const expressAynsHandler = require("express-async-handler")
const fs = require('fs');


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


productApp.get("/search/:searchString",expressAynsHandler( async (request,response)=>{
    let searchString = (request.params.searchString)
    let productDataObject = request.app.get("productDataObject")
    const regex = new RegExp(`.*${searchString}.*`, 'i');
    let products = await productDataObject.find({title : regex}).toArray()
    // console.log(searchString,products)
    if(products.length == 0) response.send({message:"no items found"})
    else response.send({message:"found",payload:products})
}))


productApp.get("/createproduct",expressAynsHandler( async(request,response)=>{
    const jsonFilePath = 'D:/major/major_back/combined_json.json'
    const productdataObject = request.app.get("productDataObject")
    const dataObject = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    let result = await productdataObject.insertMany(dataObject)
    response.send({message:"added"})
}))

productApp.delete("/deleteAll",expressAynsHandler( async(request,response)=>{
    const productdataObject = request.app.get("productDataObject")
    let res = await productdataObject.deleteMany({})
    response.send({message:`deleted ${res.deletedCount} items`})
}))
module.exports = productApp