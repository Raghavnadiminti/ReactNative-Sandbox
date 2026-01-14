const express= require('express') 
const {ManipulateCode,buildImage,runImage,killContainersByImage} = require('./Controller')
const router=express.Router() 



router.post('/getcode',async (req,res)=>{
   try{  const {userId,code,port}=req.body 

   if(!userId || !port){
       return res.status(401).json({"message":"failed port and useris required"})
   }

     const imageName='sandbox'+userId
     ManipulateCode(code)
     await buildImage(imageName,"rama") 
     const {containerId,port1}=await runImage(imageName,port)
     console.log(port1)
     res.status(200).json({"url":`https://16.170.241.164:${port1}`})
}
catch(error){
     console.log(error)
}
})

router.post("/cleanup-images", async (req, res) => {
  try {
    const { images } = req.body; 

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "images must be a non-empty array",
      });
    }

    const results = [];

    for (const imageName of images) {
      const result = await killContainersByImage(imageName);
      results.push({ imageName, result });
    }

    res.status(200).json({
      message: "Cleanup done",
      results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cleanup failed" });
  }
});


module.exports={router}