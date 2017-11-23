var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    mainH1: 'Blockchain for Asylum Seekers',
    // Override `foo` helper only for this rendering.
    subtitle: 'Storing refugee IDs as immutable data'
  });
});


module.exports = router;
