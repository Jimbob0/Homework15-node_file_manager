var fs = require('fs');

var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		}else if (inputSplit[0] == "rm") {
			removeFile(inputSplit[1]);
		}else if (inputSplit[0] == "replace") {
			replaceWord(inputSplit[1],inputSplit[2],inputSplit[3]);
		}else if (inputSplit[0] == "grep") {
			findLine(inputSplit[1],inputSplit[2]);
		}
	}
};
//show lines with word (grep)
function findLine(fileName,word) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			data = data.toString().split("\n");
			for (var i = 0; i < data.length; i++){
				data[i]=data[i].trim().split(" ");
			}
			for (i = 0; i < data.length; i++){
				for (var x = 0; x < data[i].length; x++){
					if (data[i][x] == word){
						console.log(data[i].join(" "));
					}
				}
			}
		}
	});
	
}

//replace a word (replace)
function replaceWord(fileName,orig,overwrite) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			data = data.toString().split(orig);
			data = data.join(overwrite);
			fs.writeFile(fileName, data, function(err){
				if (err) {
					console.log("Could not write to file");
				} else {
					console.log(orig+" replaced with "+overwrite);
				}
			});
		}
	});
	
}

//remove a file (rm)
function removeFile(fileName) {
	fs.unlink(fileName, function(err){
		if (err) {
			console.log("Could not delete to file");
		} else {
			console.log("File deleted");
		}
	});
}

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}
process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

