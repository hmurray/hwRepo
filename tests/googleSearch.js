var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;
var should = bootstrap.should;
var expect = bootstrap.chai.expect;
var assert = require('assert');

var googlePage = require('../pages/googlePage');
var mobiquityPage = require('../pages/mobiquityPage');
var mobiquity;// a mobiquityPage.js object
var google; // a googlePage.js object
var sessionid;
var sessionurl;

describe('Google Search - Basic Search', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator




    before(function(done) {
        google = new googlePage(browser);
        mobiquity = new mobiquityPage(browser);

        log.info("About to run browser init with desired options: " + 
            JSON.stringify(bootstrap.desired, null, 4));
        bootstrap.desired.name ="Google Search - Basic Search";

        browser.init({browserName:'chrome'}).then(function(adb) {
                log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                sessionid = sid;
                sessionurl = "https://saucelabs.com/tests/" + sid;
                bootstrap.writeToFile("Google Search - " + sessionurl);
            });
            return;
        }).nodeify(done);
    });




    after(function(done) {
        browser.quit().nodeify(done);
        log.info("Closing down browser");
    });




    it('has an initial empty test for kicks', function(done) {
        done();
    });








    describe('Mobiquity Search', function() {

        it('should display our page first', function(done) {
            log.info("About to open google home page");

            //replace with google.get
            browser.get("http://google.com", function(err) {
                if(err) {
                    log.error("Unable to get google home page: " + err);
                    done();
                }
                else {
                    log.info("Got Google.com home page!");

                    google.typeSearch("mobiquity", function() { 
                    //types the string passed into it into google search box

                        google.getFirstLinkAnchorText(function(err, firstElementText) {
                            if(err) {
                                log.error("Unable to get first result: " + err);
                            }
                            else {

                                log.info("Got element on page: " + firstElementText);
                                assert.equal(firstElementText, google.mobiquityLinkText);
                                //google.mobiquityLinkText = <em>Mobiquity</em>: 
                                //Enterprise Mobile Apps, Strategy &amp; Solutions'
                                //hardcoded in googlePage.js
                                
                            }
                            done();
                        })
                    });
                }
            });
        });
    }) // end second describe



    describe('Click Link and Verify', function () {
        it('should click the first link on the page, then verify the url and page title', function clickAndVerifyIt(err, done) {
            
            log.info("calling google.clickFistLink");

            google.clickFirstLink(err, function(err) { 
                log.info("finished clickFirstLink");
                if(err) {
                    done(err);
                }
                else {
                    verifyURL(err, function(err) {
                        log.info("finished verifyURL");
                        if(err) {
                            done(err);
                        }
                        else {
                            verifyTitle(err, function(err) {
                                log.info("finished VerifyTitle");
                                if(err) {
                                    done(err);
                                }
                                else {
                                    done();
                                }
                            }); // VerifyTitle
                        }
                    }); // VerifyURL
                }
            }); // clickFirstLink
        
         }); // end it
    }); // end desc 3





}); // end first describe


// universal functions
function verifyURL(err, done) {
    browser.url( function(err, url) {
        if(err) {
            log.error("problem " + err);
            done(err);
        }
        else {
            log.info("done with asserting URL and mobiquity.location");

            try {
                assert.equal(url, mobiquity.location);
                done();
            }
            catch (e) {
                done("Url is not right: " + e);
            }
        }
    });
}

function verifyTitle(err, done) {
    browser.title( function(err, title) {
        if(err) {
            log.error("problem " + err);
            done(err);
        }
        else {
            log.info("done with asserting title and mobiquity.mobiquityPageTitle");
    
            try {
                assert.equal(title, mobiquity.mobiquityPageTitle);
                done();
            }
            catch (e) {
                done("Title is not right: " + e);
            }
        }
    });
}







