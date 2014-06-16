// use a file stream library to handle file manipulation
var fs = require('fs');
var randoWords = require('random-words');
var textTOWrite = "Hello World\n";
var randoSentence = randoWords(5) + "\n";




var callback = function(err) { 
	//print out notification that the program has made the edits
	if(err) {	
		console.log("Error appending file: " + err);
	}
	else {
		console.log("Success!");
	}
}

//each time the applicaiton is run, add a new line of  "hello world" to file
fs.appendFile("Hello.txt", textTOWrite, callback);
fs.appendFile("RandomWords.txt", randoSentence, callback);





