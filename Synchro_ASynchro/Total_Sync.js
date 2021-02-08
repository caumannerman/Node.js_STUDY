const fs = require('fs');

console.log('start');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번',data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번',data.toString());
console.log('끝');


// 콜백함수를 부르는 비동기 메서드인 readFile()대신, readFileSync()라는 동기 메서드 사용. 직접 return값 받아옴.