'use strict';

var mongoose = require('mongoose')
var Application = mongoose.model('application');

module.exports = {

  new: function (req, res, next) {
    res.render('applications/new');
  },

  create: function (req, res, next) {
    var newApplication = new Application(req.body);
    newApplication.save()
      .then(item => {
        res.redirect('/applications');
      })
      .catch(err => {
        res.render('applications/new');
      })
  },

  index: function (req, res, next) {
    Application
      .find()
      .exec(function (err, doc) {
        res.render('applications/index', { applications: doc });
      })
  },

  show: function (req, res, next) {
    Application.findById(req.params.ID, function (err, app) {
      res.render('applications/show', { app: app })
    })
  },

  update: function (req, res, next) {
    Application.findById(req.params.ID, function (err, app) {
      app.verify(req.body.passphrase, function () {
        res.redirect('/applications');
      });
    })
  }

}  
