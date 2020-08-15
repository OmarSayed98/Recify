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
router.get('/',redirect,(req,res)=>{
    const user=req.session.name.split(' ')[0];
    users.findOne({_id:req.session.user_id})
        .then(resultuser=>{
            let movies=resultuser.movie_suggestions.filter(i=>{
                return i.poster!==null;
            });
            let series=resultuser.series_suggestions.filter(i=>{
                return i.poster!==null;
            });
            trending.findOne({name:'omar'}).then((result)=>{
                res.render('homepage',{name:user,
                    imdbid_poster:result.trending_movie,
                    imdb_poster_tv:result.trending_tv,
                    top:result.upcoming,
                    series:series,
                    movies:movies,
                    notifications:resultuser.notifications
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
