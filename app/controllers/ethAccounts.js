'use strict';

var mongoose = require('mongoose')
var Application = mongoose.model('application');
var EthAccount = mongoose.model('ethAccount');
var Web3 = require('web3');
var fs = require('fs');
const solc = require('solc');

module.exports = {

  create: function (req, res, next) {
    var application;
    var contract;
    var account;
    Application.findById(req.body.application, async function (err, app) {
      application = app
      account = await createAccount();
      contract = await deployContract(account, application);  
      var newEthAccount = new EthAccount({
        applicationId: application,
        accountAddress: account,
        contractAddress: contract
      });
      newEthAccount.save()
        .then(item => {
          res.redirect('/applications/' + application._id);
        })
        .catch(err => {
          res.render('applications');
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

async function deployContract(owner, application) {
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
      arguments: [owner, application.applicantName, application.applicantDob]
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
