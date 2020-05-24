const express=require('express');
const router=express.Router();
const user=require('../models/users');
const sanitize = require('mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
function redirect(req,res,next){
   if(req.session.name)
      return res.redirect('/home');
   next();
}
router.get('/:token',redirect,function(req,res){
   const token=sanitizeHtml(sanitize(req.params.token));
   user.findOne({resetpasstoken:token,resetpassexpiry:{$gt:Date.now()}}).then(function (result) {
      if(!result){
         req.flash('error_msg','reset token is invalid');
         res.redirect('/forget');
      }
      else{
         res.render('forgetpass_pass',{token:token});
      }
   });
});
router.post('/:token',redirect,function(req,res){
   const token=sanitizeHtml(sanitize(req.params.token));
   user.findOne({resetpasstoken:token,resetpassexpiry:{$gt:Date.now()}}).then(function (result) {
      if(!result){
         req.flash('error_msg','reset token is invalid');
         res.redirect('/forget');
      }
      else {
         result.resetpassexpiry = undefined;
         result.resetpasstoken = undefined;
         result.password = sanitizeHtml(sanitize(req.body.UserNewPassword));
         result.save().then(function (err) {
            req.flash('success_msg', 'password updated');
            res.redirect('/signin');
         });
      }
   });
});
module.exports=router;