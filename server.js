const exp = require("express")
const app = exp()
app.use(exp.json())
const path = require("path")
const cors=require('cors')
// app.use(exp.static(path.join(__dirname,"./build")))






app.use(cors())


// mongo db importing and connecting
const mclient = require("mongodb").MongoClient
const DBURL = "mongodb+srv://Srikarmara20:Srikarmara20@me.mlmyhmg.mongodb.net/"

mclient.connect(DBURL)
.then((client)=>{
    const dataBaseObject = client.db("practice")
    const userDataObject =  dataBaseObject.collection("userdata")
    const productDataObject = dataBaseObject.collection("productdata")
    const cardDataObject = dataBaseObject.collection("cartdata")

    app.set("cardDataObject",cardDataObject)
    app.set("userDataObject",userDataObject)
    app.set("productDataObject",productDataObject)

})
.catch(error =>console.log(error))

// APIS calling is stared here

const userApp = require('./APIs/userData')
const productApp = require('./APIs/product')
const cartApp = require('./APIs/cartdata')


app.use("/user",userApp)
app.use('/product',productApp)
app.use('/cart',cartApp)



// app.use('*',(request,response)=>{
//     response.sendFile(path.join(__dirname,"./build/index.html"))
// })



app.use((request,response,next)=>{
    response.send({error:`path ${request.url} is invalid`})
})



app.use((error,request,response,next)=>{
    response.send({message:"error occured",reason:`${error.message}`})
})



app.listen(3000,()=> console.log("port is listening"))
