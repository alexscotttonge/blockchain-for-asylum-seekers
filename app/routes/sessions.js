var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/new', function(req, res, next) {
  res.render('sessions/new', {
    title: 'Admin Login page'
  });
});

router.post('/', passport.authenticate("local", {
  successRedirect: "/applicants/new",
  failureRedirect: "/login"
}), function(req, res) {

  });

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect("/");
});
  

module.exports = router;
