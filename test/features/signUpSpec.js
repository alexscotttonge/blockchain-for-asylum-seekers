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
    browser
      .clickLink('Sign up here !', done);
  })

  it('redirects to the register page when you click on signup', function() {
    expect(browser.html('body')).to.contain('Sign up');
  })

  after(function(done) {
    this.server.close();
    mongoose.connection.db.dropDatabase(done);
  });

})
