const express=require('express');
const router=express.Router();
const schema=require('../models/users');
router.get('/',function(req,res){
    res.render('sign_up');
});
router.post('/',function(req,res){
    const data=req.body;
    const email=data.UserEmail.toLowerCase();
    schema.find({email:email},function(err,document){
        if(err)
            throw err;
        if(!document.length){
            const user=new schema({
                name:data.Name,
                password:data.Password,
                email:email
            });
            user.save().then(function(){
                res.render('sign_in');
            });
        }
        else{

        }
    });
});
module.exports=router;