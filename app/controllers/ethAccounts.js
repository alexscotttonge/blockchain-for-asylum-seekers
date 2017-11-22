'use strict';

var mongoose = require('mongoose')
var Applicant = mongoose.model('applicants');
var Identity = mongoose.model('identities');
var Web3 = require('web3');
var fs = require('fs');
const solc = require('solc');

module.exports = {

  create: function (req, res, next) {
    var applicant;
    var contract;
    var account;
    Applicant.findById(req.body.applicant, async function (err, app) {
      applicant = app
      account = await createAccount();
      contract = await deployContract(account, applicant);  
      var newIdentity = new Identity({
        owner: applicant,
        accountAddress: account,
        contractAddress: contract
      });
      newIdentity.save()
        .then(item => {
          res.redirect('/applicants');
          console.log('yes!')
        })
        .catch(err => {
          res.render('applicants');
        })
    })
  }
}

function createAccount() {
  var web3 = new Web3();
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var newAccount = web3.eth.accounts.create();
  return newAccount.address;
}

async function deployContract(owner, applicant) {
  var web3 = new Web3();
  var contract;
  var contractAddress;
  var instance;
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  const input = fs.readFileSync('./contracts/Identity.sol');
  const output = solc.compile(input.toString(), 1);
  const bytecode = output.contracts[':Identity'].bytecode;
  const abi = JSON.parse(output.contracts[':Identity'].interface);
  var account;
  await web3.eth.getAccounts().then((accounts) => { account = accounts[0]; })
  contract = new web3.eth.Contract(abi);
  await contract
    .deploy({
      data: '0x' + bytecode,
      arguments: [owner, applicant.applicantName, applicant.applicantDob]
    })
    .send({
      from: account,
      gas: 3000000
    })
    .on('receipt', function (receipt) {
      contractAddress = receipt.contractAddress
    })
  return contractAddress;
}
