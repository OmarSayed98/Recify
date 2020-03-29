const express=require('express');
const router=express.Router();
router.get('/',function(req,res){
    res.render('../views/sign_in');
});
module.exports=router;
