const fs = require('fs');

const readStream = fs.createReadStream('readme3.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);

//저절로 다 복사되어 새로운 writeme3.txt가 만들어진다.
