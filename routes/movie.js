const express=require('express');
const router=express.Router();
const url=require('url');
const omdb = new (require('omdbapi'))('e7aad19');
const youtubelib=require('youtube-node');
const youtube=new youtubelib();
youtube.setKey(process.env.API_KEY);
const get=(arr)=>{
    let actors="";
    for(let i=0;i<arr.length;i++){
        if(i!==arr.length-1){
            actors+=arr[i];
            actors+=",";
        }
        else
            actors+=arr[i];
    }
    return actors;
}
router.get('/',(req,res)=>{
    const id=url.parse(req.url,true).query.id;
    omdb.get({
        id:id
    }).then((result)=>{
        console.log(result);
        let arr=Object.values(result.actors);
        let arr1=Object.values(result.genre);
        let arr2=Object.values(result.director);
        let actors=get(arr),genre=get(arr1),director=get(arr2);
        youtube.search(result.title+" "+result.year+" trailer",1,(err,result1)=>{
            if(err)
                console.log(err);
            else{
                const trailerid=result1.items[0].id.videoId;
                const trailerurl="https://www.youtube.com/embed/"+trailerid;
                res.render('moviePage',{movie:result,actors:actors,genre:genre,director,trailer:trailerurl});
            }
        })
    }).catch(console.error);
});
module.exports=router;
