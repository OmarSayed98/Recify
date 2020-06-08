const express=require('express');
const router=express.Router();
const user=require('../models/users');
const movie=require('../models/movies');
router.get('/',(req,res)=>{
    user.findById(req.session.user_id)
        .then(result=>{
            const full_name=result.name;
            const email=result.email;
            const likedmovies=[];
            result.likedMovies.forEach(i=>{
                movie.findOne({imdbID:i})
                    .then(movieres=>{

                    });
            })
            res.render('profile',{name:req.session.name,full:full_name,email:email});
        });
});
router.post('/edit',(req,res)=>{
    const data=req.body;
    console.log(data);
})
module.exports=router;