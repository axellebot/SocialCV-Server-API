"use strict";

exports.get =function(req, res, next) {
  res.render('index', { title: 'Curriculum API' });
};