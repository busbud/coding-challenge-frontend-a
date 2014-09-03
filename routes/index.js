
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Coding challenge frontend A' });
};