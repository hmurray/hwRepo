var request = require('supertest');
var fs = require('fs');

var log = require('custom-logger').config({ level: 0 });
log.info().config({ color: 'green' });

var googleAPIkey = 'AIzaSyCV3o4CmdEQxIzAzdHh2YhFgT7EMyKFukE';
var googleAPI = request('https://maps.googleapis.com/maps/api/geocode/json?address=');

var forcastAPIkey = '52de31889ae1a7ecede6865556b3bb85';
var forcastAPI = request('https://api.forecast.io/forecast/');

var latLng = [];







//read physical adrss from the command line
var sys = require("sys");

var stdin = process.openStdin();

	stdin.addListener("data", function(d) {
    	
    	var address = d.toString().substring(0, d.length-1).replace(/ /g, '+') + "&key=";
    	log.info("Formatted address: " + address);

    	getLatLong(address, getWeather);
    	//address[0].replace(' ', '+');
    //log.info(d.toString().split(","));
  });

//add listener with the type sys library
function getLatLong(address, callback) {
	googleAPI
	.get(address + googleAPIkey)		//combines loc and APIkey into correct format
	.expect(200)
	.end(function(err, res) {
		if(err) {
			log.warning("Did not run correctly");
		}
		else {
			log.info("Success");

			latLng = [res.body.results[0].geometry.location.lat, res.body.results[0].geometry.location.lng];
			
			log.info("Latitude: " + latLng[0]);
			log.info("Longitude: " + latLng[1]);
		}
		callback(latLng[0], latLng[1], address); // this is getWeather()
	});
}


function getWeather(lat, lng, address) {

	forcastAPI
	.get(forcastAPIkey + "/" + lat + "," + lng)
	.expect(200)
	.end(function(err, res) {
		if(err) {
			log.warning("Did not run correctly");
		}
		else {
			log.info("Success");
			/*Also append the current date and time, 
			physical address, gps location, and 
			current weather conditions to a file that 
			is logging all the requested weather.*/
			var textTOWrite = "\n --------------------------- \n" +
							  "Address: " + address.replace(/'+'/g, " ") + 
							  JSON.stringify(res.body.currently, null, 16) +
							  "\n --------------------------- \n";

			log.info(textTOWrite);
			fs.appendFile("Weather.txt", textTOWrite);
		}
			
		});
}

