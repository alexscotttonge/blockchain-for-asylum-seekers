// var bodyParser = require('body-parser');
var Browser = require('zombie');
var assert = require('assert');


    describe('Home page', function () {

        before(function (done) {
            this.browser = new Browser({site: 'http://localhost:3000'});
            this.browser.visit('/', done);
        });

        it('should display the index page', function () {
            assert.ok(this.browser.success);
        });

        // it('has a button to Sign up here !', function () {
        //     assert(this.browser.text('a'), 'Sign up here !');
        // });
    });
