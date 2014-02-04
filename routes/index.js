/*
 * GET home page.
 */

exports.index = function(req, res){
  //Loading scripts so that they're available in the template.
  res.render('index', { title_: 'Test',scripts: ['typeahead.js','control.js']});

};
