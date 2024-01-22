const fs = require('node:fs')


async function readFile(readable) {
	for await (const chunk of readable) {
	  console.log(chunk);
	  }
  }
  const stream = fs.createReadStream('./01-read-file/text.txt', {encoding: 'utf8'});

readFile(stream);
