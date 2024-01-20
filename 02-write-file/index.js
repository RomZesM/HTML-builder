const fs = require('node:fs')
const readline = require("readline");
const { stdin: input, stdout: output } = require('node:process');
const { log } = require('node:console');

let userCurrentInput = '';

//create file 
const fileToWrite = fs.createWriteStream("./02-write-file/out.txt")
//create Interface to read from stdin and write into stdout (console)
const rl = readline.createInterface({ input, output });

	rl.question('Waiting for instructions:', (answer) => {
		if(answer === "exit"){
			fileToWrite.close()
			rl.close()
			
		}
		else{
			//write user input in file
			fileToWrite.write(answer)

			console.log(`Simon say: ${answer}`);
			rl.setPrompt('Waiting for instructions:')
			rl.prompt()
			//wait for next user input will listen for it continuously
			rl.on('line', (answer)=>{
				if(answer === "exit"){
					fileToWrite.close()
					rl.close()
				}
				else{					
					fileToWrite.write(answer)
					rl.prompt()
				}
			})
		}
	});

	rl.on('close', ()=>{
		console.log("\nThe program was terminated, good-bye");
	})

	
