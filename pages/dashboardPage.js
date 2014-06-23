var wd = require('wd');
var bootstrap = require('../bootstrap');
var log = bootstrap.log;
var browser;

var dashboardObjects = {
	doc3DownloadXPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[3]/UIAButton[1]",
	doc3XPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[3]/UIAStaticText[1]",
	downloadWindowXPath: "//UIAApplication[1]/UIAWindow[1]/UIAActivityIndicator[1]",
	doc3File1XPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[1]/UIAStaticText[1]",
	doc3File1AnnoBttnXPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[2]", 
};

var dashboardPage = function(theBrowser) {
    browser = theBrowser;
};

dashboardPage.prototype.clickDocument = function(done) {
	browser.waitForElementByXPath(dashboardObjects.doc3DownloadXPath, handleErrors(done, function(err, el) {
		el.click(handleErrors(done, function(err) {
			browser.waitForElementByXPath(dashboardObjects.downloadWindowXPath, handleErrors(done, function(err, el) {
				isVisible(done);  
			}));
		}));
	}));	
};

isVisible = function (done) {
	browser.waitForElementByXPath(dashboardObjects.downloadWindowXPath, handleErrors(done, function(err, el) {
		el.isDisplayed(handleErrors(done,function(err, displayed) {
			if(displayed) {
				log.info("Still Downloading");
				isVisible(done);
			}
			else {
				log.info("Done Downloading");
				browser.waitForElementByXPath(dashboardObjects.doc3XPath, handleErrors(done, function(err, el) {
					el.click(function(err) {
						log.info("element Tapped");
						browser.waitForElementByXPath(dashboardObjects.doc3File1XPath, handleErrors(done, function(err, el) { 
							log.info("Found File 1, Element: " + el);
							el.click(function(err) {
								log.warn(err);
								//gets to this point then has a server side error
						// 		log.info("File Clicked");
						// 		browser.waitForElementByXPath(dashboardObjects.doc3File1AnnoBttnXPath, handleErrors(done, function(err, el) { 
									
						// 			log.info("Found Annotation Button");
						// 		}));
							});
						}));
					});
				}));
			}
		}));
	}));
} 



function handleErrors(itDidNotWorkCB, itWorkedCB) {
    return function (err, other) {
        if (err) {
            itDidNotWorkCB(err);
        }
        else {
            itWorkedCB(null, other);
        }
    }
}

module.exports = dashboardPage;

