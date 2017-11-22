var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Applicant = mongoose.model('applicants');

/* GET home page. */
router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('applicants/new');
});

router.post('/', function(req, res, next) {
  var newApplicant = new Applicant(req.body) ;
  newApplicant.save()
    .then(item => {
      res.redirect('/applicants');
    })
    .catch(err => {
      res.render('applicants/new');
  })
});

router.get('/', isLoggedIn, function(req, res, next) {
  Applicant
    .find()
    .exec(function(err, doc) {
      res.render('applicants/index', { applicants: doc });
    })
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
