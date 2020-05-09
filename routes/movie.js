const express=require('express');
const router=express.Router();
const url=require('url');
const omdb = new (require('omdbapi'))('e7aad19');
const youtubelib=require('youtube-node');
const youtube=new youtubelib();
const {google}=require('googleapis');
const youtubev3=google.youtube({version:'v3',auth:process.env.API_KEY1});
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
        let arr=Object.values(result.actors);
        let arr1=Object.values(result.genre);
        let arr2=Object.values(result.director);
        let actors=get(arr),genre=get(arr1),director=get(arr2);
        youtubev3.search.list({
            part: 'snippet',
            type: 'video',
            q: result.title+" "+result.year+" trailer",
            maxResults: 10,
            order: 'relevance',
            safeSearch: 'moderate',
            videoEmbeddable: true
        }).then(result1=>{
            const trailerid=result1.data.items[0].id.videoId;
            const trailerurl="https://www.youtube.com/embed/"+trailerid;
            console.log(trailerurl);
            res.render('moviePage',{movie:result,actors:actors,genre:genre,director,trailer:trailerurl});
        }).catch(err=>console.log(err));
    }).catch(console.error);
});
module.exports=router;
