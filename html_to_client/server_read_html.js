const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    fs.readFile('./server2.html', (err, data) => {
        if(err){
            throw err;
        }
        res.end(data);
    });
})

server.listen(8081, () => {
    console.log('8081 port success, waiting....');
});
