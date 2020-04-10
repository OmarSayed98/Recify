const signin=require('./signin');
const signup=require('./signup');
const home=require('./homepage');
module.exports=function(app){
    app.use('/signin',signin);
    app.use('/signup',signup);
    app.use('/home',home);
};