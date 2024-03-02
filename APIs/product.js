const productApp = require("express").Router()
const expressAynsHandler = require("express-async-handler")
const fs = require('fs');
const ApiFeatures = require("../apiFeatures");


productApp.get("/getproducts", expressAynsHandler(async (request, response) => {
    let productDataObject = request.app.get("productDataObject")
    let allProducts = await productDataObject.find({}).toArray()
    response.send({ message: "this is products data", payload: allProducts })
}))


productApp.get("/search", expressAynsHandler(async (req, res, next) => {
    // return next(new ErrorHandler("This is my temp error",500))
    // const resultPerPage = 8;
    console.log(req.query)
    let productDataObject = req.app.get("productDataObject")
    let products = await productDataObject.find({
        $and: [
            {
                title: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            }, {
                brand: {
                    $regex: req.query.brand,
                    $options: "i"
                }
            },
            {
                type: {
                    $regex:req.query.type,
                    $options: "i",

                }
            },
            // {
                // platform: {
                //     $regex:req.query.platform,
                //     $options: "i",

                // }
            // },
            // { price: { $gte:req.query.priceL } },
            // { price: { $lte: req.query.priceH } }
        ]
    }).toArray()
    
    const productsCount = products.length;

    // let filteredProductsCount = products.length;

    // apiFeature.pagination(resultPerPage);


    res.status(200).json({
        success: true,
        productsCount,
        products,
        //   resultPerPage,
        //   filteredProductsCount,
    });
}))


productApp.get("/createproduct", expressAynsHandler(async (request, response) => {
    const jsonFilePath = 'D:/major/major_back/combined_json.json'
    const productdataObject = request.app.get("productDataObject")
    const dataObject = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    let result = await productdataObject.insertMany(dataObject)
    response.send({ message: "added" })
}))

productApp.delete("/deleteAll", expressAynsHandler(async (request, response) => {
    const productdataObject = request.app.get("productDataObject")
    let res = await productdataObject.deleteMany({})
    response.send({ message: `deleted ${res.deletedCount} items` })
}))
module.exports = productApp