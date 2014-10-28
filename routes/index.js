/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Schedule and tickets for worldwide bus travel' });
};

exports.search = function(req, res){
    console.log('From:' + req.body.SearchViewFrom);
    console.log('To: ' + req.body.SearchViewTo);
    res.render('search', { title: 'Search page' });
};