var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

var passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");


/* GET home page. */
router.get('/', function(req, res) {
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
      res.redirect("/secret");
    });
  });

});


module.exports = router;
