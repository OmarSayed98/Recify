const express=require('express');
const router=express.Router();
const url=require('url');
router.get('/',(req,res)=>{
    res.render('moviePage');
});
router.post('/',(req,res)=>{
    const id=url.parse(req.url,true).query;
    console.log(id);
    res.render('moviePage',{movie:req.body,name:req.session.name});
});
module.exports=router;
