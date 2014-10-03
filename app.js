'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var app = express();

// Add localization support
var i18n = new (require('i18n-2'))({
  locales: ['en', 'fr'],
  extension: '.json'
});
app.locals.i18n = i18n;

app.configure(function() {
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use('/bower_components', express.static(__dirname + '/assets/bower_components'));
  app.use(express.static(__dirname + '/dist'));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app
  .get('/', routes.index)
  .post('/', setLocale);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// Very basic support of the localization switching
function setLocale(req, res) {
  var new_locale = req.param('locale');

  if (new_locale) {
    i18n.setLocale(new_locale);
  }

  res.redirect('/');
}
