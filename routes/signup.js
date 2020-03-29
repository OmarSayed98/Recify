const express=require('express');
const router=express.Router();
const schema=require('../models/users');
const error=require('../public/javascripts/sign_up');
router.get('/',function(req,res){
    res.render('sign_up');
});

router.post('/',function(req,res){
    const data=req.body;
    schema.find({email:data.UserEmail},function(err,document){
        if(err)
            throw err;
        if(!document.length){
            const user=new schema({
                name:data.Name,
                password:data.Password,
                email:data.UserEmail
            });
            user.save().then(function(){
                res.render('sign_in');
            });
        }
        else{
            error;
            res.render('sign_up');
        }
    });
});
module.exports=router;