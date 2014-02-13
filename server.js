'use strict';

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = module.exports = express();

app.configure(function(){
	app.set('port', process.env.PORT || 5000);
	app.use(express.static(__dirname + '/web'));
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/api/locations/(?:location)?', function(req, res) {
	var result = [];
	
	res.setHeader('Content-Type', 'application/json');
	
	if (!req.param('location')) {
		res.status(200);
		res.send(result);
	}
	
	var url = 'http://www.busbud.com/en/complete/locations/' + req.param('location') + '?callback=fn';
	
	var request = http.get(url, function(response) {
		var buffer = '';
		
		response.on('data', function(chunk) {
			buffer += chunk;
		});
		
		response.on('end', function(err) {
			// why is callback fn mandatory? ... stripping it
			buffer = buffer.substring(3, buffer.length);
			buffer = buffer.substring(0, buffer.length - 2);
			
			try {
				result = JSON.parse(buffer);
			} catch (err) {
				res.status(500);
				res.send('Error parsing data.');
			}
			
			res.status(200);
			res.send(result);
		});
	});
	
	request.on('error', function(err) {
		console.log('error!');
		res.status(500);
		res.send('Error contacting api.');
	})
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
