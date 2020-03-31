const express=require('express');
const router=express.Router();
const users=require('../models/users');
router.get('/',function(req,res){
    res.render('sign_up');
});
router.post('/',function(req,res){
    const data=req.body;
    const errors=[];
    const email=data.UserEmail.toLowerCase();
    users.findOne({email:email}).then(function(result){
        if(!result){
            const user=new users({
                name:data.Name,
                email:data.UserEmail,
                password:data.Password
            });
            user.save();
            res.render('sign_in');
        }
        else{
            errors.push({msg:"Email Already Taken"});
            res.render('sign_up',{errors:errors,name:data.Name,email:email,password:data.Password,confirm:data.ConfirmPassword});
        }
    })
});
module.exports=router;