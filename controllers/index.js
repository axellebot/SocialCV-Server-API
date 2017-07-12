exports.get =function(req, res, next) {
  res.render('index', { title: 'Vitrine API' });
};