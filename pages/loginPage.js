var wd = require('wd');
var bootstrap = require('../bootstrap');
var log = bootstrap.log;
//var browser;

// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object

// NOTE1: this is testing Kokapena as a test app
//  https://ease.apperian.com/index.php/application/28459/appdetails#detailsTab-tab

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!

// // Page Elements Here
var loginPageObjects = {
	usernameXPath: "//UIAApplication[1]/UIAWindow[1]/UIATextField[1]",
	usernameClearTextXPath: "//UIAApplication[1]/UIAWindow[1]/UIATextField[1]/UIAButton[1]",
	keepLoggedInPath: "//UIAApplication[1]/UIAWindow[1]/UIASwitch[1]",
	passwordXPath: "//UIAApplication[1]/UIAWindow[1]/UIASecureTextField[1]",
	passwordClearTextXPath: "//UIAApplication[1]/UIAWindow[1]/UIASecureTextField[1]/UIAButton[1]",
	loginBtnXPath: "//UIAApplication[1]/UIAWindow[1]/UIAButton[1]",
	username: "j_buzzi@yahoo.com",
	password: "1212",
	usernameIncorrect: "not-working@mock.com",
	credentialsInvalidXPath:"//UIAApplication[1]/UIAWindow[4]/UIAAlert[1]/UIATableView[1]",
	credentialsInvalidOKBtnXPath: "//UIAApplication[1]/UIAWindow[4]/UIAAlert[1]/UIATableView[1]/UIATableCell[1]",	
	menuXPath: "//UIAApplication[1]/UIAWindow[1]/UIANavigationBar[1]/UIAButton[2]",
	logoutXPath: "//UIAApplication[1]/UIAWindow[1]/UIAPopover[1]/UIATableView[1]/UIATableCell[3]",
	confirmLogoutXPath: "//UIAApplication[1]/UIAWindow[3]/UIAAlert[1]/UIATableView[2]/UIATableCell[1]"	
};

var loginPage = function(theBrowser) {
    //log.info("Creating LoginPage object");

    this.browser = theBrowser;
    //browser = theBrowser;

    // Custom Exported values here
    //this.title = "Spider LMS";
    //this.location = "http://development.spiderlms.com:3000/";
};

loginPage.prototype.setUsernameTxt = function() {
    //log.info("About to set the username");
    return this.browser.waitForElementByXPath(loginPageObjects.usernameXPath, bootstrap.MaxWaitTime).then(function(err, el) {
        //log.info("Got element back with err: " + err);
        //log.info("Got element back with element: " + el);

        return this.browser.elementByXPath(loginPageObjects.usernameXPath).sendKeys(loginPageObjects.username);
    });	
}; 

loginPage.prototype.setPasswordTxt = function() {
    return this.browser.waitForElementByXPath(loginPageObjects.passwordXPath, bootstrap.MaxWaitTime).then(function(err, el) {
        return this.browser.elementByXPath(loginPageObjects.passwordXPath).sendKeys(loginPageObjects.password);
    });	
}; 

loginPage.prototype.clickLoginBtn = function() {
    return this.browser.waitForElementByXPath(loginPageObjects.loginBtnXPath, bootstrap.MaxWaitTime).then(function(err, el) {
        return this.browser.elementByXPath(loginPageObjects.loginBtnXPath).click();
    });	
};

loginPage.prototype.checkboxIsOn =  function(done) {
	if(loginPageObjects.keepLoggedInPath.value !== 1) {
		done(false);
	}
	else {
		done(true);
	}

};

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!
loginPage.prototype.validLogin = function(done) {
	var self = this;
	self.browser.elementByXPath(loginPageObjects.usernameXPath, HandleErrors(done, function(err, el) {
        log.info("Found user name input");
		el.sendKeys(loginPageObjects.username, HandleErrors(done, function(err) {
            log.info("Typed Username");
            self.browser.elementByXPath(loginPageObjects.passwordXPath, HandleErrors(done, function(err, el) {
                log.info("Found password Input");
                el.sendKeys(loginPageObjects.password, HandleErrors(done, function(err) {
                    log.info("Typed password");
                    self.browser.elementByXPath(loginPageObjects.loginBtnXPath, HandleErrors(done, function(err, el) {
                        log.info("Found login button.")
                        el.click(function(err) {
                        	if(err) {
                            	done(err);
                        	}
                        	else {
                            	done();
                        	}
                        });
                    }));
                }));
            }));
        }));
	}));
};

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!
loginPage.prototype.logout = function(done) {
	var self = this;
	self.browser.waitForElementByXPath(loginPageObjects.menuXPath, function(err, el) {
            log.info("Got menu " + el);
            log.warn("Browser " + self.browser);
            try{
		el.click(function() {
            log.info("Clicked on menu");
			self.browser.waitForElementByXPath(loginPageObjects.logoutXPath, function(err, el) {
            log.info("Getting logout " + el);
				el.click(function() {
            log.info("clicking logout");
					self.browser.waitForElementByXPath(loginPageObjects.confirmLogoutXPath, function(err, el) {
						el.click(function(err) {
                            done(err);
                        });
					});
				});
			});			
		});
	}
	catch(e) {
		done(e);
	}
	});
};

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!
loginPage.prototype.loginNetaiveResults = function(done) {
	var self = this;
	self.browser.waitForElementByXPath(loginPageObjects.usernameXPath, HandleErrors(done, function(err, el) {
		el.sendKeys(loginPageObjects.usernameIncorrect);
		self.browser.waitForElementByXPath(loginPageObjects.passwordXPath, HandleErrors(done, function(err, el) {
			el.sendKeys(loginPageObjects.password);
			self.browser.waitForElementByXPath(loginPageObjects.loginBtnXPath, HandleErrors(done, function(err, el) {
				el.click(function(err) {
					self.browser.waitForElementByXPath(loginPageObjects.credentialsInvalidXPath, bootstrap.MaxWaitTime).then(function(err, el) {
						self.browser.waitForElementByXPath(loginPageObjects.credentialsInvalidOKBtnXPath, HandleErrors(done, function(err, el) {
							el.click(function(err) {
								if(err) {
									done(err);
								}
								else {
									done();
								}
							}); // end click
						}));
					});
				});
			}));
		}));
	}));
};

loginPage.prototype.checkUserNameGreyText = function(done) {
	var self = this;
	self.browser.elementByXPath(loginPageObjects.usernameXPath, HandleErrors(done, function(err, el) {
		log.info("got username box");
		el.sendKeys("testing grey text", HandleErrors(done, function(err) {
			self.browser.elementByXPath(loginPageObjects.usernameXPath, HandleErrors(done, function(err, el) {
				el.text( HandleErrors(done, function(err, text){
					if(text.search("password") == -1) {
						log.info("Grey text not detected in username box");
						self.browser.elementByXPath(loginPageObjects.usernameClearTextXPath, HandleErrors(done, function(err, el) {
							log.info("found clear text button");
							el.click(function(err){
								log.info("text cleared");
								if(err) {
									done(err);
								}
								else {
									done();	
								}
							});
						}));
					}
					else {
						done("Box contains 'password'" + err);
					}
				}));
			}));
		}));
	}));
};

loginPage.prototype.checkPasswordGreyText = function(done) {
	var self = this;
	self.browser.elementByXPath(loginPageObjects.passwordXPath, HandleErrors(done, function(err, el) {
		log.info("got password box");
		el.sendKeys("testing grey text", HandleErrors(done, function(err) {
			self.browser.elementByXPath(loginPageObjects.passwordXPath, HandleErrors(done, function(err, el) {
				el.text( HandleErrors(done, function(err, text){
					if(text.search("password") == -1) {
						log.info("Grey text not detected in password box");
						self.browser.elementByXPath(loginPageObjects.passwordClearTextXPath, HandleErrors(done, function(err, el) {
							log.info("found clear text button");
							el.click(function(err){
								log.info("text cleared");
								if(err) {
									done(err);
								}
								else {
									done();	
								}
							});
						}));
					}
					else {
						done("Box contains 'password'" + err);
					}
				}));
			}));
		}));
	}));
};

function HandleErrors(itDidNotWorkCB, itWorkedCB) {
    return function (err, other) {
        if (err) {
            itDidNotWorkCB(err);
        }
        else {
            itWorkedCB(null, other);
        }
    }
}

module.exports = loginPage;
