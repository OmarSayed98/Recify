require('dotenv').config();
const express=require('express');
const router=express.Router();
const user=require('../models/users');
const crypto=require('crypto');
const async=require('async');
const nodemailer=require('nodemailer');
router.get('/',function(req,res){
    res.render('forgetpass_email');
});
router.post('/',function(req,res){
    async.waterfall([
        function(done){
            crypto.randomBytes(20,function(err,tok){
                const token=tok.toString('hex');
                done(err,token);
            });
        },
        function(token,done){
            const email=req.body.UserEmail;
            const error=[];
            user.findOne({email:email}).then(function(result){
                if(!result){
                    error.push({msg:'invalid email'});
                    console.log(result);
                    return res.render('forgetpass_email',{errors:error});
                }
                else {
                    result.resetpasstoken = token;
                    result.resetpassexpiry = Date.now() + 3600000;
                    result.save(function(err){
                        done(err, token, result);
                    });
                }
            });
        },
        function(token,result,done){
            const transport=nodemailer.createTransport({
                service:'Gmail',
                secure:false,
                port:587,
                auth:{
                    user:"recify1@gmail.com",
                    pass:"omaromarmoatazhatem1998"
                }
            });
            const mailoption={
                to:result.email,
                from:"recify1@gmail.com",
                subject:'Recify Password reset',
                text:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transport.sendMail(mailoption).then(function(err){
                req.flash('success_msg','Email sent');
                res.redirect('/forget');
            });
        }],
        function(err) {
            console.log('this err' + ' ' + err);
        });
});
module.exports=router;