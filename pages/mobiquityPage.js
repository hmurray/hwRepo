var browser;
var log = require("../bootstrap").log;

// Page Elements Here
// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object
var searchBoxInputById = "gbqfq";
var firstResultSelector = "#rso li .r a";

var mobiquityPage = function(theBrowser) {
    browser = theBrowser;
    log.info("mobiquity Page initialized");

    // Custom Exported values here
    this.location = "http://www.mobiquityinc.com/";
    this.mobiquityPageTitle = 
    'Enterprise Mobile Apps, Strategy & Solutions | Mobiquity';
};

mobiquityPage.prototype.getPage = function(done) {
    browser.get('http://www.mobiquityinc.com/', function(err, url) {
            log.info("done with browser.get");
        if(err) {
            log.error("Couldn't load page: " + err);
            done(err);
        }
        else {
            log.info("Loaded " + url);
            done();
        }
    });
};

module.exports = mobiquityPage;