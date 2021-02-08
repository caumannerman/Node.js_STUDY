const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((req, res) => {

  if (req.method === 'GET') {

    if (req.url === '/') {
      console.log(req.url);
      return fs.readFile('./restFront.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    } 
    
    else if (req.url === '/about') {
      console.log(req.url);
      return fs.readFile('./about.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    } 
    
    else if (req.url === '/users') {
      return res.end(JSON.stringify(users));
    }
    // Template String 앞에 .이 있는걸로 보아, ./about.html 과 같이 파일에 접근하려는 걸 염두에 둔 듯.
    return fs.readFile(`.${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404, 'NOT FOUND');
        return res.end('NOT FOUND');
      }
      return res.end(data);
    });
  
  } 
  
  
  else if (req.method === 'POST') {
    if (req.url === '/users') {
      let body = '';
      req.on('data', (data) => {// readStream의 이벤트처럼.
        body += data;
      });
      return req.on('end', () => {
        console.log('POST 본문(Body):', body);
        const { name } = JSON.parse(body);  // 문자열을 JSON형태로
        console.log(name);
        console.log(typeof name);
        const id = +new Date();
        console.log(typeof id);
        users[id] = name;

        res.writeHead(201);
        res.end('등록 성공');
      });
    }
  }
  
  
  else if (req.method === 'PUT') { // 수정버튼 눌렀을 때.

    if (req.url.startsWith('/users/')) {
      console.log(req.url);
      const key = req.url.split('/')[2];
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      
      return req.on('end', () => {
        console.log('PUT 본문(Body):', body);
        users[key] = JSON.parse(body).name;
        return res.end(JSON.stringify(users));
      });
      
    }
  }
  
  
  
  else if (req.method === 'DELETE') {
    if (req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2];
      delete users[key];
      return res.end(JSON.stringify(users));
    }
  }

  
  res.writeHead(404, 'NOT FOUND');
  return res.end('NOT FOUND');
})
  .listen(8085, () => {
    console.log('8085번 포트에서 서버 대기중입니다');
  });

