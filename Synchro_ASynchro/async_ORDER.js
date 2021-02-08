const fs = require('fs');

console.log('start');

fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번',data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
        if(err){
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme2.txt', (err, data) => {
            if(err) {
                throw err;
            }
            console.log('3번', data.toString());
        });
    });
});
//이렇게 하면, 비동기 메서드를 사용하여 효율성을 크게 저해하지 않고, 순서도 지킬 수 있게 된다.
console.log('끝');