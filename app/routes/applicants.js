var express = require('express');
var router = express.Router();
var applicationsController = require('../controllers/applications')

router.get('/new', isLoggedIn, applicationsController.new);

router.post('/', isLoggedIn, applicationsController.create);

router.get('/', isLoggedIn, applicationsController.index);

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
