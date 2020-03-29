const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require('mongoose');
const app = express();
const signin=require('./routes/signin');
mongoose.connect("mongodb://localhost:27017/Dijkstra", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/signin',signin);
module.exports=app;
app.listen(3000);