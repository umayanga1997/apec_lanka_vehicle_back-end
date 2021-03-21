var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');

var app = express();
dotenv.config();

//My routes
//Public Routes
const citiesRoute = require('./routes/Public/cities');
const vehicleTypesRoute = require('./routes/Public/vehiclesType');
const vehiclesRoute = require('./routes/Public/vehicles');
const vehiclesImagesGalleryRoute = require('./routes/Public/vehicles_image_gallery');

//PrivateRoutes
const authRoute = require('./routes/Private/userAuth');
const profileRoute = require('./routes/Private/userProfile');
const citiesRoutePrivate = require('./routes/Private/cities');
const vehicleTypesRoutePrivate = require('./routes/Private/vehiclesType');
const vehiclesRoutePrivate = require('./routes/Private/vehicles');
const vehiclesImagesGalleryRoutePrivate = require('./routes/Private/vehicles_image_gallery');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//MY MIDDLEWARES
//Public Middlewares
app.use('/vehicle/', vehicleTypesRoute);
app.use('/vehicle/', citiesRoute);
app.use('/vehicle/', vehiclesRoute);
app.use('/vehicle/', vehiclesImagesGalleryRoute);

//Private Middlewares
app.use('/vehicle/', authRoute);
app.use('/vehicle/', profileRoute);
app.use('/vehicle/', vehicleTypesRoutePrivate);
app.use('/vehicle/', citiesRoutePrivate);
app.use('/vehicle/', vehiclesRoutePrivate);
app.use('/vehicle/', vehiclesImagesGalleryRoutePrivate);

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
