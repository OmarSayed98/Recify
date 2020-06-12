const express=require('express');
const router=express.Router();
const user=require('../models/users');
const movie=require('../models/movies');
const getmovies=(result)=>{
    return result.map(i=>{
        return movie.findOne({imdbID:i})
            .then(movieres=>{
                if(movieres.type==='movie') {
                    return{
                        id: i,
                        poster: movieres.poster
                    };
                }
            });
    });
}
const getseries=(result)=>{
    return result.map(i=>{
        return movie.findOne({imdbID:i})
            .then(movieres=>{
                if(movieres.type==='series') {
                    return{
                        id: i,
                        poster: movieres.poster
                    };
                }
            });
    });
}
router.get('/',(req,res)=>{
    user.findById(req.session.user_id)
        .then(result=>{
            const full_name=result.name;
            const email=result.email;
            let likedmovies=getmovies(result.likedMovies);
            let likedseries=getseries(result.likedMovies);
            let dislikedmovies=getmovies(result.dislikedMovies);
            let dislikedseries=getseries(result.dislikedMovies);
            Promise.all(likedmovies)
                .then((likemovie)=>{
                    Promise.all(likedseries)
                        .then(likeseries=>{
                            Promise.all(dislikedmovies)
                                .then(dislikemovie=>{
                                    Promise.all(dislikedseries)
                                        .then(dislikeseries=>{
                                            console.log(likemovie);
                                            res.render('profile',{
                                                name:req.session.name,
                                                full:full_name,
                                                email:email,
                                                likedmovies:likemovie,
                                                likedseries:likeseries,
                                                dislikeseries:dislikeseries,
                                                dislikemovies:dislikemovie
                                            });
                                        })
                                })
                        })
                });
        });
});
router.post('/edit',(req,res)=>{
    const data=req.body;
    console.log(data);
})
module.exports=router;