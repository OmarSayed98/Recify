const express=require('express');
const router=express.Router();
const nodemailer=require('nodemailer');
const trending=require('../models/trending');
const sanitizeHtml = require('sanitize-html');
const users=require('../models/users');
const movie=require('../models/movies');
const _=require('underscore');
function redirect(req,res,next){
    if(!req.session.name){
        res.redirect('/signin');
    }
    else{
        next();
    }
}
const getrecommendations=(liked,itemtype)=>{
    return liked.map(like=>{
        return movie.findOne({imdbID:like})
            .then(movies=>{
                const similar=movies.content_similarity;
                let itemarr=[],num=0;
                for(let i=1;i<similar.length;i++){
                    if(num===2)
                        break;
                    if(similar[i].type===itemtype){
                        num++;
                        itemarr.push({id:similar[i].id,poster:similar[i].poster});
                    }
                }
                return itemarr;
            });
    });
}
router.get('/',redirect,(req,res)=>{
    const user=req.session.name.split(' ')[0];
    users.findById(req.session.user_id)
        .then(resultuser=>{
            const liked=resultuser.likedMovies;
            let movies=getrecommendations(liked,'movie');
            let series=getrecommendations(liked,'series');
            Promise.all(movies)
                .then(ans=>{
                    Promise.all(series)
                        .then(ans1=>{
                            ans=[].concat.apply([],ans);
                            ans1=[].concat.apply([],ans1);
                            ans=_.uniq(ans,'id');
                            ans1=_.uniq(ans1,'id');
                            console.log(ans);
                            console.log(ans1);
                            trending.findOne({name:'omar'}).then((result)=>{
                                res.render('homepage',{name:user,
                                    imdbid_poster:result.trending_movie,
                                    imdb_poster_tv:result.trending_tv,
                                    top:result.upcoming,
                                    series:ans1,
                                    movies:ans
                                });
                            });
                        });
                });
        });
});
router.get('/signout',redirect,function(req,res){
    req.session.destroy();
    res.redirect('/signin');
});
router.post('/feedback',(req,res)=>{
    const content=sanitizeHtml(req.body.Message);
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
