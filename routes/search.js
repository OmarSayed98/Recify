const express=require('express');
const youtubelib=require('youtube-node');
const router=express.Router();
const youtube=new youtubelib();
const rp=require('request-promise');
const ur=require('url');
youtube.setKey(process.env.API_KEY);
router.post('/',(req,res)=>{
   const movie=req.body;
   console.log(1);
   youtube.search(req.body.Title+' '+req.body.Year+' Trailer', 1, function(error, result) {
      if (error) {
         console.log(error);
      }
      else {
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

   });



   /*
           youtube.search(result.title+" "+result.year+" trailer",1,(err,result1)=>{
               if(err)
                   console.log(err);
               else{
                   const trailerid=result1.items[0].id.videoId;
                   const trailerurl="https://www.youtube.com/embed/"+trailerid;
                   res.render('moviePage',{movie:result,actors:actors,genre:genre,director,trailer:trailerurl});
               }
           })*/
});
module.exports=router;