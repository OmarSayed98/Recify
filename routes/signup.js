const express=require('express');
const router=express.Router();
const mongoose=require('../server');
router.get('/',function(req,res){
    res.render('sign_up');
});

router.post('/signup',function(req,res){
    var data=req.body;
    console.log(data);
});
module.exports=router;