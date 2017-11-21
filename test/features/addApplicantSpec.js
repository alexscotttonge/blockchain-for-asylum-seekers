'use strict';

const Browser = require('zombie');
const http = require('http');
const expect = require('chai').expect;
const app = require('../../app/app');

describe('add applicant', function() {

  Browser.localhost('example.com', 3001)
  var browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/applicants/new', done);
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

})
