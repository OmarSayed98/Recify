const express=require('express');
const router=express.Router();
const request=require('request-promise');
const nodemailer=require('nodemailer');
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
        trending_id=resp.results.slice(0,8).map((movie)=>{
            const optionid={
                url:`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9`,
                json:true
            }
            return request(optionid).then(respid=>{
                return {id:respid.imdb_id,poster:`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`};
            }).catch(err=>console.log(err));
        })
        request(optiontv).then(resptv=>{
            let trending_id_tv=[];
            trending_id_tv=resptv.results.slice(0,8).map((tv)=>{
                const optionid_tv={
                    url:`https://api.themoviedb.org/3/tv/${tv.id}/external_ids?api_key=9bde952e56ff27d1016ff6144cbf27c9&language=en-US`,
                    json:true
                }
                return request(optionid_tv).then(respid_tv=>{
                    return {id:respid_tv.imdb_id,poster:`https://image.tmdb.org/t/p/w600_and_h900_bestv2${tv.poster_path}`};
                })
            });
            Promise.all(trending_id).then((values_movie)=>{
                Promise.all(trending_id_tv).then(values=>{
                    const user=req.session.name.split(' ')[0];
                    res.render('homepage',{name:user,imdbid_poster:values_movie,imdb_poster_tv:values});
                }).catch(err=>console.log(err));
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    });
});
router.get('/signout',redirect,function(req,res){
    req.session.destroy();
    res.redirect('/signin');
});
router.post('/feedback',(req,res)=>{
    const content=req.body.Message;
    const transport=nodemailer.createTransport({
        service:'Gmail',
        secure:false,
        port:587,
        auth:{
            user:process.env.GMAIL,
            pass:process.env.GMAILPASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailoption={
        to:"recify1@gmail.com",
        from:process.env.GMAIL,
        subject:'feedback from user',
        text:content
    };
    transport.sendMail(mailoption).then(()=>{
        console.log('feedback sent');
        res.redirect('/home');
    });
})
module.exports=router;
