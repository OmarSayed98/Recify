const express=require('express');
const router=express.Router();
const users=require('../models/users');
const crypto=require('crypto');
const nodemailer=require('nodemailer');
function redirect(req,res,next){
    if(req.session.name){
        res.redirect('/home');
    }
    else{
        next();
    }
}
function transp(){
    return new Promise((resolve,reject)=>{
        const nodemailers=nodemailer.createTransport({
            service:'Gmail',
            secure:false,
            port:587,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAILPASS
            },
            tls:{
                rejectUnauthorized:false
            }
        });
        resolve(nodemailers);
        reject(new Error('error'));
    });
}
function rand(){
    return new Promise((resolve,reject)=>{
        resolve(crypto.randomBytes(20).toString('hex'));
        reject(new Error('error'));
    })
}
function savedb(data,rand){
    const user=new users({
        name:data.Name,
        email:data.UserEmail,
        password:data.Password,
        confirmtoken:rand
    });
    user.save().then(()=>console.log("saved to db"));
}
function send(email,nodemailers,req,rand){
    return new Promise((resolve,reject)=>{
        const option =nodemailers.sendMail({
            from:process.env.GMAIL,
            to:email,
            subject:'recify confirmation',
            text:'this email is sent to you to confirm your recify account \n'+
                'http://'+req+'/confirm/'+rand
        });
        resolve(option);
        reject(new Error('error'));
    })
}
router.get('/',redirect,function(req,res){
    res.render('sign_up');
});
router.post('/',redirect,function(req,res){
    const data=req.body;
    const errors=[];
    const email=data.UserEmail.toLowerCase();
    users.findOne({email:email}).then(function(result){
        if(!result){
            let rando;
            const ran=rand().then(rand=>{
                savedb(data,rand);
                rando=rand;
            });
            transp()
                .then(mailer=>send(email,mailer,req.headers.host,rando))
                .catch(err=>console.log(err));
            req.flash('email_msg','confirmation mail sent');
            res.redirect('/signin');
        }
        else{
            errors.push({msg:"Email Already Taken"});
            res.render('sign_up',{errors:errors,name:data.Name,email:email,password:data.Password,confirm:data.ConfirmPassword});
        }
    })
});
module.exports=router;