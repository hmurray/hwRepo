var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;

var loginPage = require('../pages/loginPage');
var login;
var sessionid;
var sessionurl;

describe('3RB Login - Open Browser', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        login = new loginPage(browser);

        //log.info("About to run browser init with desired options");
        bootstrap.desired.name="3rb - Initialize Environment";
        browser.init(bootstrap.desired).then(function(adb) {
            log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                    process.env["SauceOnDemandSessionID"] = sid;
                    process.env["job-name"] = bootstrap.desired.name;

                    sessionid = sid;
                    sessionurl = "https://saucelabs.com/tests/" + sid;

                    bootstrap.writeToFile("3RB Login - " + sessionurl);
                });

            return;

        }).nodeify(done);
    });

	it('Initiated', function(done) {
		done();
	});

    after(function(done) {
        browser.quit().nodeify(done);
    });

    it('C8036 - Stay Logged In', function (done) {
        login.checkboxIsOn(function(err) {
            if(err) {
                done(err);
            }
            else {
                done();
            }
        });
    });

    it('C8035 - Grey Text Dissapears', function (done) {
        login.checkUserNameGreyText(function(err) {
            log.info("Finished checkUserNameGreyText");
            if(err) {
                done(err);
            }
            else {
                login.checkPasswordGreyText(function(err) {
                    if(err) {
                        done(err);
                    }
                    else {
                        done();
                    }
                });
            }
        });
    });

    it('C8033 - Valid Login', function (done) {
        login.validLogin(function (err) {
            if(err) {
                done(err);
            }
            else {
                login.logout(function (err) {
                    done(err)
                });
            }
        });
    });

    it('C8034- Invalid Login 3x', function (done) {
        
        login.loginNetaiveResults( function (err) {
            if(err) {
                done(err);
            }
            else {
                login.loginNetaiveResults( function (err) {
                    if(err) {
                        done(err);
                    }
                    else {
                        login.loginNetaiveResults( function (err) {
                            if(err) {
                                done(err);
                            }
                            else {
                                done();
                            }
                        });
                    }
                });
            }
        });
    });
}); // File Describe

