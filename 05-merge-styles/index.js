const fs = require('fs/promises');
const fsr = require('fs');
const path = require('path'); 


const fileToWrite = fsr.createWriteStream("05-merge-styles/project-dist/bundle.css")


async function getCssFiles (){
	let filesPaths = []
	//get all files from dir as array of Dirent
	let files = await fs.readdir("05-merge-styles/styles", { withFileTypes: true })
	for (let index = 0; index < files.length; index++) {
		const file = files[index];
		//check if file is NOT a dir
		if(!file.isDirectory()){
			//make full path for the file
			let pathToFile = `./05-merge-styles/styles/${file.name}`
			
			//parse path to get file name and extension
			let filePathParseResult = path.parse(pathToFile)
			let fileExtension = filePathParseResult.ext
			if(fileExtension === '.css'){
				filesPaths.push(pathToFile)
			}	
		}
	}
  return filesPaths
}

//read one file async
const readFile = async (filePath) => {
  return await fs.readFile(filePath, 'utf-8');
};

async function readAllCssFiles (){
  //get css files adressess
  let pathArr = await getCssFiles()
  try {
	  pathArr.forEach(async element => {
		let result = await readFile(`${element}`);
		fileToWrite.write(result)
		fileToWrite.write('\n')
		//console.log(result);
		
	});
  } catch (error) {
    console.error('Error reading files:', error.message);
  }
};








//readFiles([filePath1, filePath2, filePath3]);
readAllCssFiles();


