'use strict';

const Browser = require('zombie');
const http = require('http');
const expect = require('chai').expect;
const app = require('../../app/app');
const mongoose = require('mongoose');
var Applicant = mongoose.model('applicants');
var Identities = mongoose.model('identities');

describe('ethereum account', function () {
  
  Browser.localhost('example.com', 3001)
  var browser = new Browser();

  before(function (done) {
    var newApplicant = new Applicant({
      applicantName: 'John Doe',
      applicantDob: '01/01/1977'
    });
    newApplicant
      .save(done)
  })

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/applicants', done);
  })

  before(function (done) {
    this.timeout(5000)
    browser.pressButton('Verify', done)
  })

  it('creates a new ethereum account', function (done) {
    Applicant.findOne({
      applicantName: 'John Doe'
    }).exec(function (err, app) {
      Identities.findOne({
        owner: app
      }).exec(function (err, addr) {
        expect(addr.accountAddress.length).to.equal(42);
        done();
      })
    })
  })

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });
  
})
