
/*
 * GET home page.
 */

exports.index = function(req, res){
  'use strict';

  var i18n = res.app.locals.i18n;
  var locales = res.app.locales;
  var lang = req.params.lang;

  if (locales.indexOf(lang) === -1) {
    lang = locales[0];
    res.redirect('/' + lang);
    return;
  }

  i18n.setLocale(lang);
  res.render('index');
};
