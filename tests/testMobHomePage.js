/*
	Make a new test file to test the mobiquity home page
	Verify at least 5 elements on the page
	Verify that you can click all the menu items
	Verify the title on each new page
	Make PageObjects for each new page so they each have a title property 
	(similar to assignment 1 - MobiquityHomePage if you look at the 
	solution branch)
*/
var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;
var should = bootstrap.should;
var expect = bootstrap.chai.expect;
var assert = require('assert');
var webdriver = require('wd');

var mobiquityPage = require('../pages/mobiquityPage');
var mobiquity;
var sessionid;
var sessionurl;

var ImageSelectorCSS = 'img';

describe('Testing elements on mobiquity home page', function() {
	this.timeout(bootstrap.MaxWaittime); // to get the app open in the emulator

	// run before tests start
	before(function(done) {
		mobiquity = new mobiquityPage(browser);

		log.info(log.info("About to run browser init with desired options: " + 
            JSON.stringify(bootstrap.desired, null, 4)));
        bootstrap.desired.name ="Testing elements on Mobiquity home page";

        browser.init({browserName:'chrome'}).then(function(adb) {
                log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                sessionid = sid;
                sessionurl = "https://saucelabs.com/tests/" + sid;
                bootstrap.writeToFile("Mobiquity test - " + sessionurl);
            });
            return;
        }).nodeify(done);
	}); // end before

	// run after tests end
	after(function(done) {
		browser.quit().nodeify(done);
		log.info("Closing down browser");
	});










	describe('Test 5 Elements on Page', function() {
		it("Should get images on page", function(done) {
			log.warn("Starting mobiquity.get " + mobiquity + " " + mobiquity.get);
			mobiquity.getPage( function (err) {
				if (err) {
					log.error("Couldn't get elements");
				}
				else {
					log.warn("Starting getElementByCSS");
					getElementByCSS( function (err) {
						if(err) {
							log.error("Could not get elements. " + err);
							done(err);
						}
						else {
							log.info("Completed getElementByCSS");
							done();
						}
					});
				}
			});
		});
	}); // end desc 2























	describe('Test Click All Links on Menu and Verify Titles', function() {

	}); // end desc 3

}); // end desc 1

function getElementByCSS(done) {
	browser.elementsByCssSelector('.cycle-pager', function(err, elements) {
		if(err) {
			log.warn("Elements: " + elements);
			done(err);
		}
		else {
			log.warn("Elements: " + elements);
			done();
		}
	});
}




