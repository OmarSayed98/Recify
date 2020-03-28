var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var app = express();
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
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);
module.exports=app;
//Hello
//Hello 2