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
    res.render('homepage');
});
router.get('/signout',redirect,function(req,res){
    res.render('homepage');
});
router.post('/signout',redirect,function(req,res){
    req.session.destroy();
    res.redirect('/signin');
});
module.exports=router;
