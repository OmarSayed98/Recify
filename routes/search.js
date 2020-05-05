const express=require('express');
const youtubelib=require('youtube-node');
const router=express.Router();
const youtube=new youtubelib();
youtube.setKey(process.env.API_KEY);
router.post('/',(req,res)=>{
   const movie=req.body;
   youtube.search(req.body.Title+' '+req.body.Year+' Trailer', 1, function(error, result) {
      if (error) {
         console.log(error);
      }
      else {
         const moviedata={movie:movie,link:result.items[0].id.videoId};
         console.log(moviedata.link);
      }
   });
});
module.exports=router;