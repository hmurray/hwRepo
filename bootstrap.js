exports.request = require('supertest')

exports.testURL='';
//exports.testURL='https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE';

var forecast = require('forecast.io');
var options = {
	APIKEY	: process.env.FORECAST_API_KEY,
	timeout : 2500
}
forecast = new forecast(options);


exports.log = require('custom-logger').config({ level: 0 });
exports.log.info().config({ color: 'green' });
