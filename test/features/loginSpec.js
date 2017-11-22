'use strict';
const Browser = require('zombie');
const http = require('http');
const expect = require('chai').expect;
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
    expect(browser.success);
  });

  it('has the relevant sign up links', function() {
    expect(browser.assert.link('a', 'Sign up here !', '/register'));
    expect(browser.assert.link('a', 'login', '/login'));
    expect(browser.assert.link('a', 'logout', '/logout'));
  });

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });


});




// it('has a button to Sign up here !', function () {
//     assert(this.browser.text('a'), 'Sign up here !');
// });
