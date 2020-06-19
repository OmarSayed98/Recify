const express=require('express');
const router=express.Router();
const trending=require('../models/trending');
router.get('/',(req,res)=>{
    trending.findOne({name:'omar'},{useFindAndModify: false})
        .then(result=>{
            user.findOne({_id:req.session.user_id})
                .then(resuser=>{
                    res.render('showmoremovies', {
                        name:req.session.name,
                        action:result.action_tv,
                        drama:result.drama_tv,
                        Science_Fiction:result.Science_Fiction_tv,
                        comedy:result.comedy_tv,
                        notifications:resuser.notifications
                    });
                });
        });
});

module.exports=router;