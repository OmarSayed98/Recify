const express=require('express');
const router=express.Router();
const trending=require('../models/trending');
router.get('/',(req,res)=>{
    trending.findOne({name:'omar'},{useFindAndModify: false})
        .then(result=>{
            res.render('showmoretvshows', {
                name:req.session.name,
                action_adventure:result.action_adventure_tv,
                drama:result.drama_tv,
                crime:result.crime_tv,
                comedy:result.comedy_tv
            });
        });
});

module.exports=router;