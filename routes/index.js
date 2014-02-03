/*
 * GET home page.
 */

exports.index = function(req, res){
  //Loading scripts s.t. they are available in the template.
  res.render('index', { title_: 'Test',scripts: ['typeahead.js','control.js']});

};
