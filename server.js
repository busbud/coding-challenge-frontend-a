/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

/**
 * Application routes
 */

var lang  = require('./routes/lang-api');
var search  = require('./routes/search-api');

app.use(lang);
app.use(search);
app.use(express.static('public'));


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
