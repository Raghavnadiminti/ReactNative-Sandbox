const express= require('express') 
const {ManipulateCode,buildImage,runImage} = require('./Controller')
const router=express.Router() 



router.get('/getcode',async (req,res)=>{
     code=req.body 

     ManipulateCode(code)
     await buildImage('sandbox1',rama) 
     await runImage('sandbox1')

})



module.exports={router}