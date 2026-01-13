const express= require('express') 
const {ManipulateCode,buildImage,runImage} = require('./Controller')
const router=express.Router() 



router.get('/getcode',async (req,res)=>{
   try{  const {userId,code,port}=req.body 

   if(!userId || !port){
       return res.status(401).json({"message":"failed port and useris required"})
   }

     const imageName='sandbox'+userId
     ManipulateCode(code)
     await buildImage(imageName,"rama") 
     const {containerId,port1}=await runImage(imageName,port)
     res.status(200).json({"url":`https://51.21.167.159:${port1}`})
}
catch(error){
     console.log(error)
}
})



module.exports={router}