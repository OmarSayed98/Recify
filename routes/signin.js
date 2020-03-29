const express=require('express');
const router=express.Router();
const mongoose=require('../server.js');
const users=require('../models/users');
router.get('/',function(req,res){
    res.render('sign_in');
});
router.post('/',function(req,res){
    var data=req.body;
    users.findOne({email:data.UserEmail},function(err,user){
        if(err)
            throw err;
        if(user) {
            user.comparePassword(data.UserPassword, function (err, match) {
                if (err)
                    throw err;
                if (match)
                    res.render('sign_in');
                else{

                }
            })
        }
        else{

        }
    })
});
module.exports=router;
