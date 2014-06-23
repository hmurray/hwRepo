var bootstrap = require('../bootstrap');
var assert = require('assert');

var log = bootstrap.log;
var browser = bootstrap.browser;

var asserters = bootstrap.wd.asserters;

var should = bootstrap.should;
var expect = bootstrap.chai.expect;

var twitterHomePage = require("../pages/twitterHomePage");
var twitterHome = new twitterHomePage(browser);
var mobiquityPage = require("../pages/mobiquityPage");
var mobiquity = new mobiquityPage(browser);

var sessionid;
var sessionurl;

describe('Testing waitFor syntax', function() {
	this.timeout(bootstrap.MaxWaittime); // to get the app open in the emulator

	// run before tests start
	before(function(done) {

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

	describe("Open page, wait for text", function() {
		it('should let me use asserters', function(done) {
        twitterHome.open(function (err) {
            if (err) {
                done(err);
            }
            else {
                log.info("Opened twitter home page...");
                // Click about
                browser.waitForElementByCssSelector("a[href=\"\/about\"]", function(err, el) {
                    el.click(function(err) {
                        log.info("CLICKED ON ABOUT, err is: " + err);
                        // Make sure I wait for the title to be whatever the about page title is
                        try{]
                        	// JQuery works on twitter because its on the website, but wont work on google or mobiquity
                            browser.waitFor(asserters.jsCondition('$("title").html ? true : false'), 2000, function(err, status) {
                                //NewPageLoaded(done, err, status);
                                if(err) {
                                	log.info("failures");
                                	done(err);
                                }
                                else {
                                	log.info("success");
                                	done();
                                }
                            });
                        }
                        catch(e) {
                            log.error("Error waiting: " + e);
                            done(e);
                        }

                    });
                });

            }
        });

    });

		it('should let me use asserters', function(done) {
				browser.get('https://google.com', function (err) {
				log.warn("getPage finished");
				if (err) {

				log.warn("failed");
					done(err);
				}
				else {
					try {

					log.warn(" success");
					
					browser.waitFor(asserters.jsCondition('document.querySelector("title").innerHTML ? true : false'), 
	       				2000, function (err, status) {
	       					if(err) {
	       						log.info("error in waitFor " + err);
	       						done(err);
	       					}
	       					else {
	       						log.info("success");
	       						done();
	       					}
		    			}); // end waitFor


					}// end try
					catch(e) {
						done(e);
					}
				}

			});
		});

		
	});// end second desc
}); // end first describe











