var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;
var should = bootstrap.should;
var expect = bootstrap.chai.expect;
var assert = require('assert');

var googlePage = require('../pages/googlePage');
var google; // a googlePage.js object
var sessionid;
var sessionurl;

describe('Google Search - Basic Search', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator




    before(function(done) {
        google = new googlePage(browser);

        log.info("About to run browser init with desired options: " + JSON.stringify(bootstrap.desired, null, 4));
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

                    google.typeSearch("mobiquity", function() { //types the string passed into it into google search box

                        google.getFirstLinkAnchorText(function(err, firstElementText) {
                            if(err) {
                                log.warning("Unable to get first result: " + err);
                            }
                            else {

                                log.info("Got element on page: " + firstElementText);
                                assert.equal(firstElementText, google.mobiquityLinkText);
                                //google.mobiquityLinkText = <em>Mobiquity</em>: Enterprise Mobile Apps, Strategy &amp; Solutions'
                                //hardcoded in googlePage.js
                                
                            }
                            done();
                        })
                    });
                }
            });
        });
    }) // end second describe



    describe('Click Link and Verify', function(finalDone) {
        it('should click the first link on the page', function(finalDone) {
            
            log.warn("calling google.clickFistLink");

            google.clickFirstLink( function(err) {
                log.warn("AAAAAAAA CLICKING");
                if(err) {
                    log.warning("Unable to click first result: " + err);
                }
                else {
                 finalDone();
                } 
            });
         });
    });





}); // end first describe

