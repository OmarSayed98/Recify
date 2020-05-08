const express=require('express');
const youtubelib=require('youtube-node');
const router=express.Router();
const youtube=new youtubelib();
const rp=require('request-promise');
const ur=require('url');
youtube.setKey(process.env.API_KEY);
router.post('/',(req,res)=>{
   const movie=req.body;
   youtube.search(req.body.Title+' '+req.body.Year+' Trailer', 1, function(error, result) {
      if (error) {
         console.log(error);
      }
      else {
         res.redirect('/movie');
         return;
         const moviedata={movie:movie,link:result.items[0].id.videoId};
         let url="http://localhost:3000/movie?id=";
         url+=movie.imdbID.toString();
         const query="?id="+movie.imdbID.toString();
         let options={
            method:'POST',
            uri:url,
            body:moviedata,
            json:true
         };
         rp(options).then(data=>console.log('request sent')).catch(err=>console.log('fail'));
      }
   })
   //res.redirect('/movie');
});
module.exports=router;