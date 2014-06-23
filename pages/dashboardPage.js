var wd = require('wd');
var bootstrap = require('../bootstrap');
var log = bootstrap.log;
var browser;

// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object

// NOTE1: this is testing Kokapena as a test app
//  https://ease.apperian.com/index.php/application/28459/appdetails#detailsTab-tab

// // Page Elements Here
var dashboardObjects = {
	document3DownloadXPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[3]/UIAButton[1]",
	document3XPath: 		"//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[3]",
	textXPath: 				"//UIAApplication[1]/UIAWindow[1]/UIAStaticText[2]"
};

var dashboardPage = function(theBrowser) {
    browser = theBrowser;
};

dashboardPage.prototype.clickDocument = function(done) {
	log.info("In clickDocument");
	browser.waitForElementByXPath(dashboardObjects.document3DownloadXPath, function(err, el) {
	log.info("Found documentXPath clickDocument " + el);
		el.click(function(err) {
			log.info("Clicked download");
			if(err) {
				log.info("Failure: " + err);
				done(err);
			}
			else {
				log.info("Success");
				browser.waitForElementByXPath(dashboardObjects.document3XPath, function(err, el) {
					//log.info("found the document " + el);
				try{
					//log.warn(dashboardObjects.document3XPath);
					browser.clickElement("//UIAApplication[1]/UIAWindow[1]/UIANavigationBar[1]/UIAButton[2]", function() {
						//if (err) { log.error("Error: " + err); }
						//else
						log.info("Clicked game of thrones document");
					});
				}
				catch(e) {
					log.error("Could not click element: " + e);
					done(e);
				}
				
				});
			}
			// setTimeout(function() {
			// 	done();
			// }, 4000);
		});
	});	
}; 

module.exports = dashboardPage;

