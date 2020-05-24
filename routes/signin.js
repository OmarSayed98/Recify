const express=require('express');
const router=express.Router();
const users=require('../models/users');
const sanitize = require('mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
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
    const useremail=sanitizeHtml(sanitize(data.UserEmail));
    const userpassword=sanitizeHtml(sanitize(data.UserPassword));
    users.findOne({email:useremail}).then(function(result){
        if(!result){
            errors.push({msg:"Invalid Data"});
            res.render('sign_in',{errors:errors,email:useremail,password:userpassword});
        }
        else if(result.confirmtoken!==undefined){
            errors.push({msg:"confirm your email"});
            res.render('sign_in',{errors:errors,email:useremail,password:userpassword});
        }
        else{
            result.comparePassword(userpassword,function(err,match){
                if(err)
                    throw err;
                if(match){
                    req.session.name=sanitizeHtml(sanitize(result.name));
                    req.session.user_id=result._id;
                    console.log(result._id);
                    res.redirect('/home');
                }
                else{
                    errors.push({msg:"Invalid Data"});
                    res.render('sign_in',{errors:errors,email:useremail,password:userpassword});
                }
            })
        }
    });
});
module.exports=router;
