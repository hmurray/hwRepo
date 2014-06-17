"use strict";

require('colors');
exports.chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
exports.chai.use(chaiAsPromised);
exports.should = exports.chai.should();
var wd = require('wd');

exports.log = require('custom-logger').config({ level: 0 }); // TODO: Change to 2 for sauce
exports.log.info().config({ color: 'green', format: '<logInfoMessage>type="%event%" message="%message% </logInfoMessage>' });

exports.MaxWaitTime = 120000;

///////////////////////////////////////////////////////////////////////////
// TODO: EDIT THIS DEPENDING ON WHERE YOU ARE RUNNING THE THING
// MAKE SURE THAT YOUR LOCAL PATH IS SPECIFIC TO YOUR MACHINE
// TODO: PUT THIS IN A CONFIG FILE THAT IS NOT IN GITHUB
///////////////////////////////////////////////////////////////////////////
var onSauce = false;
//var url = 'http://localhost:4444/wd/hub'; // Local Url

//var localProjectPath = "/Users/ecarmichael/Library/Developer/Xcode/DerivedData/3rbPOC-ccxhuumqhwbwtvheqaptxtykuayq/Build/Products/Debug-iphonesimulator/3rbPOC.app";
var localProjectPath = "google.com";
var sauceProjectPath = "google.com";

var nameOfTestLinkFile = "SauceResults.xml";

var host = "localhost";
var port = 4444; //4723; 
var pathToProject;

if(onSauce) {
    host = 'ondemand.saucelabs.com'; //http://ondemand.saucelabs.com:80/wd/hub
    port = 80;
    var username = 'mobiquity';
    var accessKey = '75b72184-3f8d-45d5-ae04-8d79d2b06ccb';
    pathToProject = sauceProjectPath;
    exports.browser = wd.promiseChainRemote(host, port, username, accessKey);

    exports.desired = {
        name:"Test Framework - Selenium wd",
        browserName:"chrome",
        platform:"OS X 10.6",
        version: '35'
    };
}
else { // Run the test locally
    pathToProject = localProjectPath;
    exports.browser = wd.promiseChainRemote(host, port);

    exports.desired = {
        name:"Test Framework - Selenium wd",
        browserName:"Chrome",
        platform:"OS X 10.8",
        version: '35'
    };
}

var fs = require('fs');

exports.writeToFile = function(content) {
    fs.appendFile(nameOfTestLinkFile, content + "\n\n", function(err) {
        if(err) {
            exports.log.warn(err);
        } else {
            exports.log.info("The test link file was saved!");
        }
    }); 
}

fs.unlink(nameOfTestLinkFile, function(err) {
    if(err) {
        exports.log.warn(err);
    } else {
        exports.log.info("The test link file was removed!");
    }
});
    
exports.writeToFile("Sauce Test Reults");

