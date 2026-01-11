const express= require('express') 
const {ManipulateCode,buildImage,runImage} = require('./Controller')
const router=express.Router() 



router.get('/getcode',async (req,res)=>{
   try{  const {code}=req.body 

     ManipulateCode(code)
     await buildImage('sandbox1',"rama") 
     await runImage('sandbox1')

     res.json({"url":"https://51.21.167.159:"})
}
catch(error){
     console.log(error)
}
})



module.exports={router}