const express=require('express');
const router=express.Router();
const users=require('../models/users');
function redirect(req,res,next){
    if(req.session.name)
        return res.redirect('/home');
    next();
}
router.get('/:token',redirect,function(req,res){
    users.findOne({confirmtoken:req.params.token}).then((result)=>{
        if(!result){
            req.flash('error_msg','invalid token');
            res.redirect('/signin');
        }
        else{
            result.confirmtoken=undefined;
            result.save().then((err)=>console.log(err));
            req.flash('confirm','email confirmed');
            req.session.name=result.name;
            res.redirect('/home');
        }
    });
});
module.exports=router;