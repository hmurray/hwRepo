var bootstrap = require("../bootstrap");
var assert = require('assert');

var log = bootstrap.log;
var browser = bootstrap.browser;

var twitterHomePage = require("../pages/twitterHomePage");
var twitterHome = new twitterHomePage(browser);
var asserters = bootstrap.wd.asserters; // commonly used asserters

describe('Twitter Search', function() {
    this.timeout(bootstrap.MaxWaittime);

    before(function(done) {
        browser.init(bootstrap.desired, function(err, sessionid, caps) {
            if(err) {
                done(err);
            }
            else {
                log.info("Initialized the browser with session: " + sessionid);

                done();
            }
        });
    });

    after(function(done) {
        done();
        // browser.quit(function(err) {
        //     if(err) {
        //         done(err);
        //     }
        //     else {
        //         log.info("Successfully closed the browser");
        //         done();
        //     }
        // });
    });

    it('should initialize', function(done) {
        //expect(1).equals(2);
        // if(assert.equal(1,2,'why does this hang')) {
        //     log.info("PASSED");
        // }
        // else {
        //     log.info("FAILED");
        // }

        log.info("Initialize test ran!");
        done();
    });


    function HandleErrors(mochaTestDoneCB, itWorkedCB, other) {
        return function (err) {
            if (err) {
                mochaTestDoneCB(err);
            }
            else {
                itWorkedCB(other);
            }
        }
    }

    it('should let me use asserters', function(done) {
        twitterHome.open(function(err) {
            if(err) {
                done(err);
            }
            else {
                log.info("Opened twitter home page...");
                // Click about
                browser.waitForElementByCssSelector("a[href=\"\/about\"]", function(err, el) {
                    el.click(function(err) {
                        log.info("CLICKED ON ABOUT, err is: " + err);
                        // Make sure I wait for the title to be whatever the about page title is
                        try{
                            browser.waitFor(asserters.jsCondition('$("title").html ? true : false'), bootstrap.MaxWaittime, function(err, status) {
                                NewPageLoaded(done, err, status);
                            });
                        }
                        catch(e) {
                            log.error("Error waiting: " + e);
                            done(e);
                        }

                    });
                })

            }
        })


    });

    function NewPageLoaded(done, err, status) {
        log.info("waiting complete! ON THE ABOUT TWITTER PAGE!: " + status);
        browser.title(done, function(err, titletext) {
            if(err) {
                done(err);
            }
            else {
                log.info("TITLE IS: " + titletext);
                done();
            }
        });
    }


    xit('should not let me log in with valid username and invalid password', function(done) {
        //browser.open("https://www.twitter.com").then()
        // Open the page
        twitterHome.open(HandleErrors(done, function () {
            TypeInvalidUserName(HandleErrors(done, function() {
                TypeInvalidPassword(HandleErrors(done, function() {
                    twitterHome.clickLogin(HandleErrors(done, function() {
                        log.info("Clicked login!");
                        done();
                    }));
                }));
            }));
        }));


        // Validate error page

        //done();
    });
})

function TypeInvalidPassword(done) {
    log.info("About to type invalid password");

    twitterHome.typePassword("somethingstupid", function(err) {
        if(err) {
            done(err);
        }
        else {
            log.info("I typed something in the password field succesfully");
            done();
        }
    })
}

function TypeInvalidUserName(done) {
    log.info("About to type invalid username");

    twitterHome.typeUserName("abcdefghijklmnopqrstuvwxyz1983", function(err) {
        if(err) {
            done(err); // Unable to type for some reason
        }
        else {
            log.info("I typed something in the username field succesfully");
            try {
                assert.equal(1, 2, "not equal");
                done();
            }
            catch(e) {
                done(e);
            }
        }
    })
}