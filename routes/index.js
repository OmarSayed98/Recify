const signin=require('./signin');
const signup=require('./signup');
module.exports=function(app){
    app.use('/signin',signin);
    app.use('/signup',signup);
};