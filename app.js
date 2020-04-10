const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash=require('connect-flash');
const session=require('express-session');
const app = express();
const route=require('./routes/index');
const db=require('./server');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'sakdjfas;kdfjaslkfj',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    next();
});
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
route(app);
module.exports=app;
app.listen(3000);