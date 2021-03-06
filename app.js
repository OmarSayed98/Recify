require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash=require('connect-flash');
const session=require('express-session');
const app = express();
const route=require('./routes/index');
const db=require('./server');
const MongoStore=require('connect-mongo')(session);
const ms=require('ms');
const schedule=require('./Daily updates/scheduledb');
const recommend=require('./recommendation engines/contentrecommender');
const showmore=require('./movies/movies_tv');
const Session=session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie : {
        maxAge: ms('14 days')
    },
    store:new MongoStore({mongooseConnection:db})
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Session);
app.use(flash());
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.email_msg=req.flash('email_msg');
    res.locals.confirmation=req.flash('confirm');
    next();
});
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
route(app);
app.get('/',(req,res)=>{
    res.redirect('/home');
});
module.exports=app;
app.listen(3000);