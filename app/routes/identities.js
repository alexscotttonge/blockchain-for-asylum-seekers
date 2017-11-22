var express = require('express');
var router = express.Router();
var ethAccounts = require('../controllers/ethAccounts');

router.post('/', ethAccounts.create);

module.exports = router;
