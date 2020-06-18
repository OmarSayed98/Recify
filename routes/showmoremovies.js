const express=require('express');
const router=express.Router();
const trending=require('../models/trending');
router.get('/',(req,res)=>{
    trending.findOne({name:'omar'},{useFindAndModify: false})
        .then(result=>{
            res.render('showmoremovies', {
                name:req.session.name,
                action:result.action_movies,
                drama:result.drama_movies,
                Science_Fiction:result.Science_Fiction_movies,
                comedy:result.comedy_movies
            });
        });
});
module.exports=router;