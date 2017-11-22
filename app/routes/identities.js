var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Applicant = mongoose.model('applicants');
var Identity = mongoose.model('identities');
var Web3 = require('web3');

router.post('/', function (req, res, next) {
  var applicant = req.body.applicant;
  var newIdentity = new Identity({
    owner: applicant,
    accountAddress: createAccount()
  });
  newIdentity.save()
    .then(item => {
      res.redirect('/applicants');
    })
    .catch(err => {
      res.render('applicants');
    })
});

function createAccount() {
  var web3 = new Web3();
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var newAccount = web3.eth.accounts.create();
  return newAccount.address;
}

module.exports = router;
