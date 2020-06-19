const express=require('express');
const router=express.Router();
const trending=require('../models/trending');
const user=require('../models/users');
router.get('/',(req,res)=>{
    trending.findOne({name:'omar'},{useFindAndModify: false})
        .then(result=>{
            user.findOne({_id:req.session.user_id})
                .then(resuser=>{
                    res.render('showmoremovies', {
                        name:req.session.name,
                        action:result.action_movies,
                        drama:result.drama_movies,
                        Science_Fiction:result.Science_Fiction_movies,
                        comedy:result.comedy_movies,
                        notifications:resuser.notifications
                    });
                });
        });
});
module.exports=router;