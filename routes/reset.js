const express=require('express');
const router=express.Router();
router.get('/:token',function(req,res){
   res.render('forgetpass_pass');
});
module.exports=router;