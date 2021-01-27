const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k,...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});


const server = http.createServer((req,res) => {
    const cookies = parseCookies(req.headers.cookie);
    //console.log(cookies);
    console.log(req.headers);
    if (req.url.startsWith('/login')){
    
        const{ query } = url.parse(req.url,true);
        const{query2} = url.parse(req.url, false)
        console.log(query);
        console.log(query2);
        const { name } = qs.parse(query);
        const expires = new Date();
        console.log(query, name, expires);
        //쿠키의 만료시간을 5분뒤로 설정
        expires.setMinutes(expires.getMinutes() + 5);


        
        res.writeHead(302, {
            Location: '/',
            //헤더에 한글 넣을 수 없으므로 encodeURIComponent(name)처리 // 쿠키설정 옵션들 ;로 구분하여 작성. 
            'Set-Cookie': `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });



        res.end();
    } else if (cookies.name){// res.end에 한글 들어가면 인코딩 문제 발생하므로 text/html;char~처리해준 것.
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요?`);
    } else {
        fs.readFile('./Identify_User.html', (err,data) => {
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
})

server.listen(8083, () => {
    console.log('8083 port Success & waiting....');
});
