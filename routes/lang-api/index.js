var express = require('express');
var app = module.exports = express();
var fs = require('fs');

app.get('/lang/:language', function(req, res) {
  // Go back a couple directories to get the languages (@TODO definitely not a
  // good way of doing this, fix it)
  var langDir  = __dirname + '/../../langs/';
  var langFile = req.params.language + '.json';
  var translations;

  // Does a language file exists?
  if(fs.existsSync(langDir + langFile)) {
    translations = fs.readFileSync(langDir + langFile);
  } else {
    translations = fs.readFileSync(langDir + 'en.json');
  }

  res.send(JSON.parse(translations));
});
