const signin=require('./signin');
const signup=require('./signup');
const home=require('./homepage');
const forget=require('./forget');
const reset=require('./reset');
module.exports=function(app){
    app.use('/signin',signin);
    app.use('/signup',signup);
    app.use('/home',home);
    app.use('/forget',forget);
    app.use('/reset',reset);
};