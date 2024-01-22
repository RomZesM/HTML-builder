const { log } = require('node:console');
const fs = require('node:fs/promises');
const path = require('path'); 


// function callback(err) {
// 	if (err) throw err;
// 	console.log('source.txt was copied to destination.txt');
//   }


async function getFilePaths (){
	//get all files from dir as array of Dirent
	let filesPaths = []
	let files = await fs.readdir("./04-copy-directory/files", { withFileTypes: true })
	for (let index = 0; index < files.length; index++) {
		const file = files[index];
		//check if file is NOT a dir
		if(!file.isDirectory()){
			//make full path for the file
			let pathToFile = `./04-copy-directory/files/${file.name}`
					//console.log(pathToFile);
			filesPaths.push(pathToFile)

		}
	}
	return filesPaths;
}

function getFileDestPath(fileSrc){
	let filePathParseResult = path.parse(fileSrc)
	//console.log(filePathParseResult.base);
	return `04-copy-directory/files-copy/${filePathParseResult.base}`
}

async function copyDir(){
	//remove dir if it exist
	try{
		let check = await fs.stat('04-copy-directory/files-copy/')
		let rem = await fs.rm('04-copy-directory/files-copy', {recursive: true })
	}
	catch (err){}
	//create dir
	await fs.mkdir('04-copy-directory/files-copy', { recursive: true }); 
	//copy all files
	const fileToCopy = await getFilePaths()
	for (let i = 0; i < fileToCopy.length; i++) {
		const fileSrc = fileToCopy[i];
		const fileDest = getFileDestPath(fileSrc)
		//console.log(fileSrc, fileDest);
		await fs.copyFile(fileSrc, fileDest)
	}	
}
copyDir()