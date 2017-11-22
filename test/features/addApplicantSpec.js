'use strict';

const Browser = require('zombie');
const http = require('http');
const expect = require('chai').expect;
const app = require('../../app/app');
const mongoose = require('mongoose');

describe('add applicant', function() {

  Browser.localhost('example.com', 3001)
  var browser = new Browser();

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
    browser.visit('/applications/new', done);
  })

  before(function(done) {
    browser
      .fill('applicantName','John Doe')
      .fill('applicantDob','01/01/1977')
      .pressButton('Add', done);
  })

  it('adds a new applicant', function(){
    expect(browser.html('body')).to.contain('John Doe');
  })

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

})
