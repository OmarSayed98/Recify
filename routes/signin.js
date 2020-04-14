const express=require('express');
const router=express.Router();
const users=require('../models/users');
function redirect(req,res,next){
    if(req.session.name){
        res.redirect('/home');
    }
    else{
        next();
    }
}
router.get('/',redirect,function(req,res){
    res.render('sign_in');
});
router.post('/',redirect,function(req,res){
    const data=req.body;
    const errors=[];
    users.findOne({email:data.UserEmail}).then(function(result){
        if(!result){
            errors.push({msg:"Invalid Data"});
            res.render('sign_in',{errors:errors,email:data.UserEmail,password:data.UserPassword});
        }
        else{
            result.comparePassword(data.UserPassword,function(err,match){
                if(err)
                    throw err;
                if(match){
                    req.session.name=result.name;
                    res.redirect('/home');
                }
                else{
                    errors.push({msg:"Invalid Data"});
                    res.render('sign_in',{errors:errors,email:data.UserEmail,password:data.UserPassword});
                }
            })
        }
    });
});
module.exports=router;
