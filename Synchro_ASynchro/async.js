const fs = require('fs');

console.log('start');

fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번',data.toString());
});

fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('2번',data.toString());
});

fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('3번',data.toString());
});

console.log('끝');
// start, 끝이 항상 먼저 로그에 찍히고, 1번, 2번, 3번은 무작위!