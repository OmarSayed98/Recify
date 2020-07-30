const express=require('express');
const router=express.Router();
const user=require('../models/users');
router.get('/',(req,res)=>{
   user.findOne({_id:req.session.user_id})
       .then(result=>{
          res.render('notification',{notifications:result.notifications});
       });
});
module.exports=router;