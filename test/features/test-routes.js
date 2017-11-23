'use strict';

var Browser = require('zombie');
var assert = require('assert');
const http = require('http');
const app = require('../../app/app');
const mongoose = require('mongoose');

describe('Home page', function() {

  Browser.localhost('example.com', 3001)
  var browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/', done);
  })

  it('should display the index page', function() {
    assert.ok(browser.success);
  });

  it('has a button to Sign up here !', function() {
    assert(browser.text('a'), 'Sign up here !');
    assert(browser.text('a'), 'login');
    assert(browser.text('a'), 'logout');
  });


  // it('has a button to Sign up here !', function () {
  //     assert(this.browser.text('a'), 'Sign up here !');
  // });


  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

});
