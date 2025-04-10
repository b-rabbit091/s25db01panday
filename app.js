var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Costume = require("./models/costume");
var resourceRouter = require('./routes/resource');
var costumesRouter = require('./routes/costumes');



require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artifactsRouter = require('./routes/artifacts');
var gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artifacts', artifactsRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);

app.use('/resource', resourceRouter);
app.use('/costumes', costumesRouter);

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

async function recreateDB() {
  // Delete everything
  await Costume.deleteMany();

  // First instance
  let instance1 = new Costume({ costume_type: "ghost", size: 'large', cost: 15.4 });
  instance1.save().then(doc => {
    console.log("First object saved:", doc);
  }).catch(err => {
    console.error(" Error saving first object:", err);
  });

  // Second instance
  let instance2 = new Costume({ costume_type: "vampire", size: 'medium', cost: 22.0 });
  instance2.save().then(doc => {
    console.log("Second object saved:", doc);
  }).catch(err => {
    console.error(" Error saving second object:", err);
  });

  // Third instance
  let instance3 = new Costume({ costume_type: "witch", size: 'small', cost: 18.75 });
  instance3.save().then(doc => {
    console.log("Third object saved:", doc);
  }).catch(err => {
    console.error(" Error saving third object:", err);
  });
}

let reseed = true;
//if (reseed) { recreateDB(); }

module.exports = app;
