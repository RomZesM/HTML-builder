const fs = require('fs/promises');
const fsr = require('fs');

const filePath1 = '05-merge-styles/styles/style-1.css';
const filePath2 = '05-merge-styles/styles/style-2.css';
const filePath3 = '05-merge-styles/styles/style-3.css';

const fileToWrite = fsr.createWriteStream("05-merge-styles/project-dist/bundle.css")

// Function to read a file and return a promise
const readFile = async (filePath) => {
  return await fs.readFile(filePath, 'utf-8');
};

async function readFiles (pathArr){
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

readFiles([filePath1, filePath2, filePath3]);



