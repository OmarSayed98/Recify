const signin=require('./signin');
const signup=require('./signup');
const home=require('./homepage');
const forget=require('./forget');
const reset=require('./reset');
const confirm=require('./confirm');
const movie=require('./movie');
const profile=require('./profile');
module.exports=function(app){
    app.use('/signin',signin);
    app.use('/signup',signup);
    app.use('/home',home);
    app.use('/forget',forget);
    app.use('/reset',reset);
    app.use('/confirm',confirm);
    app.use('/movie',movie);
    app.use('/profile',profile);
};