const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('path'); 


async function dir2 (){
	//get all files from dir as array of Dirent
	let files = await fsp.readdir("./03-files-in-folder/secret-folder", { withFileTypes: true })
	for (let index = 0; index < files.length; index++) {
		const file = files[index];
		//check if file is NOT a dir
		if(!file.isDirectory()){
			//make full path for the file
			let pathToFile = `./03-files-in-folder/secret-folder/${file.name}`
			//parse path to get file name and extension
			let filePathParseResult = path.parse(pathToFile)
			let fileName = filePathParseResult.name
			let fileExtension = filePathParseResult.ext

			//get file stats and get size from Stat object
			let stat = await fsp.stat(pathToFile)
			let size = stat.size;

			console.log(`${fileName} - ${fileExtension.substring(1)} - ${size}`);

		}
	}
}
dir2()