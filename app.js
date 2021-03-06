var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var fs = require('fs');

var app = express();

app.use(logger('dev'));
//app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(busboy());
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
				res.status(err.status || 500);
				res.render('error', {
						message: err.message,
						error: err
				});
		});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
				message: err.message,
				error: {}
		});
});


// Load routes.
var routesPath = path.join(__dirname , '/routes');
fs.readdirSync(routesPath).forEach(function (file) {
		if (~file.indexOf('.js')) {
				var route = require(path.join(routesPath, file));
				route.routes(app);
		}
});

// Render 404 page
app.use(function(req, res, next) {
  res.status(404).render('blood.jade');
  next();
});

module.exports = app;
