const express=require('express');
const router=express.Router();
const users=require('../models/users');
const sanitize = require('mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
function redirect(req,res,next){
    if(req.session.name)
        return res.redirect('/home');
    next();
}
router.get('/:token',redirect,function(req,res){
    const token=sanitizeHtml(sanitize(req.params.token));
    users.findOne({confirmtoken:token}).then((result)=>{
        if(!result){
            req.flash('error_msg','invalid token');
            res.redirect('/signin');
        }
        else{
            result.confirmtoken=undefined;
            req.session.user_id=result._id;
            result.save().then((err)=>console.log(err));
            req.flash('confirm','email confirmed');
            req.session.name=sanitizeHtml(sanitize(result.name));
            res.redirect('/home');
        }
    });
});
module.exports=router;