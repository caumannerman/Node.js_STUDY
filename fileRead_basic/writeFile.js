const fs = require('fs');

fs.writeFile('./readme2.txt', '글입력', (err) =>{
    if(err){
        throw err;
    }
    fs.readFile('./readme2.txt', (err, data) => {
        if(err){
            throw err;
        }
        console.log(data.toString());
    });
});