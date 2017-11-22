'use strict';

var mongoose = require('mongoose')
var Applicant = mongoose.model('applicants');

module.exports = {

  new: function (req, res, next) {
    res.render('applicants/new');
  },

  create: function(req, res, next) {
    var newApplicant = new Applicant(req.body) ;
    newApplicant.save()
      .then(item => {
        res.redirect('/applicants');
      })
      .catch(err => {
        res.render('applicants/new');
    })
  },

  index: function(req, res, next) {
    Applicant
      .find()
      .exec(function(err, doc) {
        res.render('applicants/index', { applicants: doc });
      })
  }


}
