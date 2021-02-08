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
    // 맨 뒤의 {}는 빈 객체를 초기값으로 한다는 것.



/*쿠키에 이름을 담아 보내면, 쿠키 조작 등 너무 보안이 취약하다.  사용자 이름과 쿠키 만료시간은 session에 저장*/
const session = {};
//세션을 보통이렇게 변수로 두지는 않음. 보통 DB에!

const server = http.createServer((req,res) => {
    const cookies = parseCookies(req.headers.cookie);
    //console.log(cookies);
    console.log(req.headers);
    if (req.url.startsWith('/login')){
    
        const{ query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        
        //쿠키의 만료시간을 5분뒤로 설정
        expires.setMinutes(expires.getMinutes() + 5);

        const randomInt = Date.now();
        session[randomInt] = {
            name,
            expires,
        };
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly;Path=/`,
        })

        /*   위의 코드가 이 코드를 대체한 것임.
        res.writeHead(302, {
            Location: '/',
            //헤더에 한글 넣을 수 없으므로 encodeURIComponent(name)처리 // 쿠키설정 옵션들 ;로 구분하여 작성. 
            'Set-Cookie': `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        */ 
        

        res.end();
    } 
    
    /*else if (cookies.name){// res.end에 한글 들어가면 인코딩 문제 발생하므로 text/html;char~처리해준 것.
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요?`);
        아래 코드가 대체!!*/
    
        else if (cookies.session && session[cookies.session].expires > new Date()){// res.end에 한글 들어가면 인코딩 문제 발생하므로 text/html;char~처리해준 것.
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요?`);
    } 
    
    
    else {
        fs.readFile('./session.html', (err,data) => {
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
})

server.listen(8084, () => {
    console.log('8084 port Success & waiting....');
});
