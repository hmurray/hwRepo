##Selenium
------
Functional tests for websites - can test web on mobile devices via sauce (or if you have the patience to set up all the drivers)

Uses Mocha for ease of adding tests
bootstrapper.js contains global settings
Page Objects should be used for each page or functional area that makes sense

###Running Locally
------
0. Run ```npm install```
1. The chrome driver must be downloaded and in the path
	1. http://chromedriver.storage.googleapis.com/index.html?path=2.9/ 
2. The selenium server must be running
	1. ```npm install selenium-standalone```
	2. run the server ```./node_modules/.bin/start-selenium -debug```
	3. This is typically locally on port 4444 at <http://localhost:4444/wd/hub>
	4. Run ```mocha tests```


###Assignment 1
------
* Run the existing google home page test (make sure it passes before you begin)
* Make a Mobiquity Home Page Object file 
* Add in another test to verify that clicking on the first link in the search results takes you to the mobiquity home page 
* Verify the title on the Mobiquity Home Page (make sure you wait until the page is loaded before checking the title)
