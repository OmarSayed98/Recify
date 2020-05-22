const express=require('express');
const router=express.Router();
const request=require('request-promise');
function redirect(req,res,next){
    if(!req.session.name){
        res.redirect('/signin');
    }
    else{
        next();
    }
}
router.get('/',redirect,(req,res)=>{
    const option={
        url:"https://api.themoviedb.org/3/trending/movie/week?api_key=9bde952e56ff27d1016ff6144cbf27c9",
        json:true
    };
    const optiontv={
        url:"https://api.themoviedb.org/3/trending/tv/week?api_key=9bde952e56ff27d1016ff6144cbf27c9",
        json:true
    }
    request(option).then(resp=>{
        let trending_id=[];
        trending_id=resp.results.map((movie)=>{
            const optionid={
                url:`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9`,
                json:true
            }
            return request(optionid).then(respid=>{
                return {id:respid.imdb_id,poster:`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`};
            });
        });
        request(optiontv).then(resptv=>{
            let trending_id_tv=[];
            trending_id_tv=resptv.results.map((tv)=>{
                const optionid_tv={
                    url:`https://api.themoviedb.org/3/tv/${tv.id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9&language=en-US`,
                    json:true
                }
                return request(optionid_tv).then(respid_tv=>{
                    return {id:respid_tv.imdb_id,poster:`https://image.tmdb.org/t/p/w600_and_h900_bestv2${tv.poster_path}`};
                });
            });
            Promise.all(trending_id).then((values_movie)=>{
                Promise.all(trending_id_tv).then(values=>{
                    const user=req.session.name.split(' ')[0];
                    res.render('homepage',{name:user,imdbid_poster:values_movie,imdb_poster_tv:values});
                })
            });
        })
    });
});
router.get('/signout',redirect,function(req,res){
    req.session.destroy();
    res.redirect('/signin');
});
module.exports=router;
