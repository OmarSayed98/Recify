const express=require('express');
const router=express.Router();
function redirect(req,res,next){
    if(!req.session.name){
        res.redirect('/signin');
    }
    else{
        next();
    }
}
router.get('/',redirect,function(req,res){
    const user=req.session.name.split(' ')[0];
    res.render('homepage',{name:user});
});
router.get('/signout',redirect,function(req,res){
    req.session.destroy();
    res.redirect('/signin');
});
module.exports=router;
