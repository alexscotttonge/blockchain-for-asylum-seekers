var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('secret', { title: 'This is a secret' });
});

module.exports = router;
