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
    browser.visit('/', done);
  })

  before(function(done) {
    browser.clickLink('Sign up here !', done)
  })

  before(function(done) {
    browser
      .fill('username', 'Josephine')
      .fill('password', 'HelloWorld')
      .pressButton('Sign up', done)
  })

  before(function(done) {
    browser
      .fill('username', 'Josephone')
      .fill('password', 'HelloWorld')
      .pressButton('Login', done)
  })

  before(function(done) {
    browser
      .visit('/applicants/new', done);
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
