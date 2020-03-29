const express=require('express');
const router=express.Router();
const mongoose=require('../server.js');
router.get('/',function(req,res){
    res.render('sign_in');
});
module.exports=router;
