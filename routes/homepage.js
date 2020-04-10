const express=require('express');
const router=express.Router();
router.get('/',function(req,res){
    if(req.session.email){
        res.redirect('/home');
        req.session.destroy;
    }
    else{
        console.log(req.session.email);
        res.redirect('/signin');
    }
});
module.exports=router;