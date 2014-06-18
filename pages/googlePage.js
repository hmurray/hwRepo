var webdriver = require('wd');
var log = require('custom-logger').config({ level: 0 }); // TODO: Change to 2 for sauce
var browser;

// Page Elements Here
// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object
var searchBoxInputById = "gbqfq";
var firstResultSelector = "#rso li .r a";





var GooglePage = function(theBrowser) {
    browser = theBrowser;
    log.info("Google Page initialized");

    // Custom Exported values here
    this.location = "http://google.com/";
    this.mobiquityLinkText = '<em>Mobiquity</em>: Enterprise Mobile Apps, Strategy &amp; Solutions';
};





//types the string passed into it into google search box
                                 //passing in "mobiquity" to searchString
GooglePage.prototype.typeSearch = function(searchString, done) {
    log.info("About to search for text: " + searchString);

                            //Hard coded at top
    browser.waitForElementById(searchBoxInputById, function(err, el) {
        if(err) {
            log.err("Unable to find search box: " + err);
            done();
        }
        else {      //typing "mobiquity"
            el.sendKeys(searchString, function(err) {
                if(err) {   
                    log.err("Unable to type text into search box: " + err);
                }
                else {
                    log.info("Successfully typed text: " + searchString);
                }


                done();
            });
        }
    })
}









GooglePage.prototype.getFirstLinkAnchorText = function(done) {
    var self = this;
    log.info("About to get first link anchor text");
                                        //hardcoded at top
    browser.waitForElementByCssSelector(firstResultSelector, function(err, el) {
        if(err) {                                   // el is the results of the waitForElementByCssSelector function
            done(err);
        }
        else {
            self.getLinkText(el, done);
            done();
        }
    });
}










GooglePage.prototype.getLinkText = function(el, done) {
    el.getAttribute("innerHTML", function(err, val) {
        if(err) {
            done(err);
        }
        else {
            done(null, val);
                        //val is firstElementText in googleSearch.js 
        }
    });
}



GooglePage.prototype.clickFirstLink = function(finishedClickFirstLink) {

    log.warn("About to get click link anchor text");

    browser.waitForElementByCssSelector(firstResultSelector, function(err, el) {
        log.warn("Inside waitForElement in clickFirstLink");

            el.click(function(err, done) {
                if(err) {
                    log.warn("Inside if in el.click");
                    done(err);
                }
                else {
                    log.warn("Inside else in el.click");

                    done();
                }
            })
            finishedClickFirstLink();
    });

    
} // end clickFirstLink




 // clickElement(el, function() {
            //     if(err) {

            //         log.info("not clicked");
            //         done(err);
            //     }
            //     else {
            //         log.info("clicked");
            //         //url(cb) -> cb(err, url))
            //     }
            //     done();
            // });










module.exports = GooglePage;