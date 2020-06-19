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
};
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
};
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
                                            res.render('profile',{
                                                name:req.session.name,
                                                full:full_name,
                                                email:email,
                                                likedmovies:likemovie,
                                                likedseries:likeseries,
                                                dislikeseries:dislikeseries,
                                                dislikemovies:dislikemovie,
                                                notifications:result.notifications
                                            });
                                        })
                                })
                        });
                });
        });
});
router.post('/edit',(req,res)=>{
    const data=req.body;
    if(data.newName!==undefined){
        user.findOneAndUpdate({_id:req.session.user_id},{name:data.newName},{useFindAndModify: false})
            .then(()=>{
                console.log('name updated');
                req.session.name=data.newName;
                req.flash('success_msg','data updated successfully');
                res.redirect('/profile');
            });
    }
    if(data.newEmail!==undefined){
        user.findOneAndUpdate({_id:req.session.user_id},{email:data.newEmail},{useFindAndModify: false})
            .then(()=>{
                console.log('email updated');
                req.flash('success_msg','data updated successfully');
                res.redirect('/profile');
            });
    }
    if(data.oldPassword!==undefined){
        user.findOne({_id:req.session.user_id})
            .then(result=>{
                result.comparePassword(data.oldPassword,(err,match)=>{
                    if(err)
                        return err;
                    if(match){
                        req.flash('success_msg','data updated successfully');
                        result.password=data.newPassword;
                        result.save().then(()=>console.log('password updated'));
                        res.redirect('/profile');
                    }
                    else{
                        req.flash('error_msg','invalid data');
                        console.log('invalid password');
                        res.redirect('/profile');
                    }
                })
            })
    }
});
module.exports=router;