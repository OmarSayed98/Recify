const express=require('express');
const router=express.Router();
const user=require('../models/users');
router.get('/:token',function(req,res){
   const token=req.params.token;
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
router.post('/:token',function(req,res){
   user.findOne({resetpasstoken:req.params.token,resetpassexpiry:{$gt:Date.now()}}).then(function (result) {
      if(!result){
         req.flash('error_msg','reset token is invalid');
         res.redirect('/forget');
      }
      else {
         result.resetpassexpiry = undefined;
         result.resetpasstoken = undefined;
         result.password = req.body.UserNewPassword;
         result.save().then(function (err) {
            req.flash('success_msg', 'password updated');
            res.redirect('/signin');
         });
      }
   });
});
module.exports=router;