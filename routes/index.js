// View that retrieves the app's homepage
exports.index = function(req, res){
  res.render('index', { title: "Busbud | Welcome" });
};

// View that displays results of the submitted form
exports.submit = function(req, res){
  res.render('submit', { title:'Busbud | Ready to go', from: req.body.from, to: req.body.to });
};