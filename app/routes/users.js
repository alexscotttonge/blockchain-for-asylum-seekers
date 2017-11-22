var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var  passportLocalMongoose = require("passport-local-mongoose");

router.get('/new', function(req, res) {
  res.render('register', {
    title: 'Sign Up form '
  });
});

router.post('/', function(req, res) {
  req.body.username
  req.body.password
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/applicants");
    });
  });

});

module.exports = router;
