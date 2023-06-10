let jsw = require("jsonwebtoken")

let validateUser = (request,response,next)=>{
console.log("headers",request.headers)
   let bearerToken = request.headers.authorization;
   // console.log( "token is" ,bearerToken)
   if (bearerToken == undefined) {
      
      return response.send({ message: "Unauthorized request" });
   }
   let token = bearerToken.split(" ")[1]
   if(token == null)return response.send({ message: "Unauthorized request" });

   try{
         jsw.verify(token,"asdfghjkl")
         next()
   
   }
   catch(error){
     response.send({message:`error is ${error.message}`})
   }
   
    
}

module.exports = validateUser