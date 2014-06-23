var browser;
var log = require("../bootstrap").log;

var signinUsernameCssSelector = "#signin-email";
var signinPasswordCssSelector = "#signin-password";
var signinSubmitCssSelector = "button.js-submit";

var twitterHomePage = function(theBrowser) {
    browser = theBrowser;
    log.info("Twitter Page initialized");

    // Custom Exported values here
    this.location = "https://twitter.com/";
    this.title = 'Twitter';
};

// open(cb) -> cb(err)
twitterHomePage.prototype.open = function(done) {
    browser.get(this.location, function(err) {
        if(err) {
            done(err);
        }
        else {
            log.info("Opened Twitter Home Page");
            done();
        }
    });
}

// typeUserName(usernameString, cb) -> cb(err)
twitterHomePage.prototype.typeUserName = function(nameToType, allDoneTypingCB) {
    typeStuff(nameToType, signinUsernameCssSelector, allDoneTypingCB);
}

// typeUserName(passwordString, cb) -> cb(err)
twitterHomePage.prototype.typePassword = function(passwordToType, allDoneTypingCB) {
    typeStuff(passwordToType, signinPasswordCssSelector, allDoneTypingCB);
}

twitterHomePage.prototype.clickLogin = function(doneClickingCB) {
    browser.waitForElementByCssSelector(signinSubmitCssSelector, function(err, el) {
        if(err) {
            doneClickingCB(err);
        }
        else {
            el.click(function(err) {
                if(err) {
                    doneClickingCB(err);
                }
                else {
                    log.info("clicked login button - super done");
                    doneClickingCB();
                }
            })
        }

    });
    //browser.waitForElementByCssSelector(signinSubmitCssSelector, function)
}

function typeStuff(stuffToType, cssSelector, allDoneTypingCB) {
    browser.waitForElementByCssSelector(cssSelector, function(err, el) {
        if(err) {
            allDoneTypingCB(err);
        }
        else {
            el.sendKeys(stuffToType, function(err) {
                if(err) {
                    allDoneTypingCB(err);
                }
                else {
                    allDoneTypingCB();
                }
            })
        }
    })
}



module.exports = twitterHomePage;