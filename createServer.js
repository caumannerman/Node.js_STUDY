const http = require('http');

const server = http.createServer((req,res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('Hello Server!');
});

server.listen(3000, ()=> {
    console.log("3000 port waiting...")
});

server.on('listening', () => {
    console.log('Success & waiting...')
});

server.on('error', (error) => {
    console.error("error다 error");
});