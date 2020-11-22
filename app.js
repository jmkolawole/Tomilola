
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var cors = require('./routes/cors');


//const app = express().use('*', cors());



  
//The different routes now

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messageRouter = require('./routes/messageRouter');
var likeRouter = require('./routes/likeRouter');

//Import mongoose
var mongoose = require('mongoose');

//mongodb+srv://Kolawole:<password>@ajoke.6ft8q.mongodb.net/<dbname>?retryWrites=true&w=majority
//OladapO2290
//Kolawole
//Import Model
const Messages = require('./models/messages');


//Connect to database
const url = config.mongoUrl;
const connect = mongoose.connect(process.env.MONGODB_URL || url,{
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then(() => {
  console.log('Database Connected')
});

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => { console.log(err) });


var app = express();

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'))
}

app.use(function(req, res, next){
res.header("Access-Control-Allow-Origin", "*",);
res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

if(req.method === "OPTIONS"){
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  return res.status(200).json({});
}

next();

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/messages', messageRouter)
app.use('/likes', likeRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
