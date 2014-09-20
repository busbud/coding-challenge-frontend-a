var express = require('express');
var app = module.exports = express();
var http = require('http');

app.get('/search/:query', function(req, res) {
  // Construct the request
  var reqOptions = {
    host: 'busbud-napi-prod.global.ssl.fastly.net',
    port: 80,
    path: '/search?q=' + req.params.query,
    headers: {
      // Pulled from http://busbud-napi-prod.global.ssl.fastly.net/auth/guest
      'x-busbud-token': 'GUEST_ZzLs2k1AT9CkjFW7u5m68w'
    }
  };

  // Hit the Busbud API
  http.get(reqOptions, function(response) {
    // Set the encoding
    response.setEncoding('utf8');

    // Pipe the response to the client
    response.pipe(res);

    // Log errors
    response.on('error', function(e) {
      console.log(e.message);
    });
  });
});
