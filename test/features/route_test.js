// var bodyParser = require('body-parser');
var Browser = require('zombie');
var assert = require('assert');


describe('Home page', function() {

  before(function(done) {
    this.browser = new Browser({
      site: 'http://localhost:3000'
    });
    this.browser.visit('/', done);
  });

  it('should display the index page', function() {
    assert.ok(this.browser.success);
  });

  it('has the relevant sign up links', function() {
    this.browser.assert.link('a', 'Sign up here !', '/register');
    this.browser.assert.link('a', 'login', '/login');
    this.browser.assert.link('a', 'logout', '/logout');
  });

  // it('has a button to Sign up here !', function () {
  //     assert(this.browser.text('a'), 'Sign up here !');
  // });
});
