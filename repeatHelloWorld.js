// use a file stream library to handle file manipulation
var fs = require('fs');
var randoWords = require('random-words');
var textTOWrite = "Hello World\n";
var randoSentence = randoWords({ min: 3, max: Math.random() + 10 , join: " "}) + ".\n";


var callback = function(err) { 
	//print out notification that the program has made the edits
	if(err) {	
		console.log("Error appending file: " + err);
	}
	else {
		console.log("File successfully appended!");
	}
}

//each time the applicaiton is run, add a new line of  "hello world" to file
fs.appendFile("Hello.txt", textTOWrite, callback);
fs.appendFile("RandomWords.txt", randoSentence, callback);


//print out how many times the file has been run
var content = fs.readFileSync("RandomWords.txt", 'utf8');
var count = 1;

for(var i = content.length; i > 0; i--)
{
	if(content[i] == "\n") {
		count++;
	}
}

console.log("repeatHelloWorld.js has been ran " + count + " times.");

/*
// more standard way of programming this

GetLinesInFile(function(numTimesRun) {
	var ess = numTimesRun == 1 ? '':'s';
	console.log("This has been run " + numTimesRun + " time" + ess + ". ")
})
funciton GetLinesInFile(numLoinesCallBack){
	fs.readFile(logFile, 'utf8', function(err, data) {
		if(err) {
		return console.log("Rroblem getting lne count in file: " + err);
		}
		numLinesCallBack(data.split("\n").length - 1)
	})
}
*/




