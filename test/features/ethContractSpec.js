'use strict';

const Browser = require('zombie');
const http = require('http');
const expect = require('chai').expect;
const app = require('../../app/app');
const mongoose = require('mongoose');
var Application = mongoose.model('application');
var EthAccount = mongoose.model('ethAccount');

describe('blockchain identity contract', function () {
  
  Browser.localhost('example.com', 3001)
  var browser = new Browser();

  before(function (done) {
    var newApplication = new Application({
      applicantName: 'John Doe',
      applicantDob: '01/01/1977'
    });
    newApplication
      .save(done)
  })

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/users/new', done);
  })

  before(function (done) {
    browser
    .fill('username','admin')
    .fill('password','password')
    .pressButton('Sign up', done);
  })

  before(function (done) {
    browser.pressButton('Verify', done);
  })

  it('creates a new ethereum address', function (done) {
    Application.findOne({
      applicantName: 'John Doe'
    }).exec(function (err, app) {
      EthAccount.findOne({
        applicationId: app
      }).exec(function (err, addr) {
        expect(addr.contractAddress.length).to.equal(42);
        done();
      })
    })
  })

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });
  
})
