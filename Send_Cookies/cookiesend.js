const http = require('http');
//쿠키는 name=yyy;year=1996 과 같이 오니까, 이를 { name: 'yyy', year: 1996} 과 같이 바꿔주는 parseCookies함수 만듦.


const parseCookies = (cookie = '') =>
cookie.split(';').map(v => v.split('=')).map(([k, ...vs]) => [k, vs.join('=')]).reduce((acc,[k,v]) => {
    acc[k.trim()] = decodeURIComponent(v);
    return acc;
}, {});

const server = http.createServer((req,res) => {
    //console.log(req.headers.cookie); --> mycookie=test/ mycookie=test임.
    const cookies = parseCookies(req.headers.cookie);
    //console.log(typeof(req.headers.cookie)); --> string임.
    
    console.log(req.url); // -> favicon.ico  // req.url은 path와 search부분을 알려줌. 파비콘 없으면, 파비콘정보 요청보냄.
    console.log(cookies);
    res.writeHead(200, { 'Set-Cookie': 'mycookie=test'});//응답의 헤더에 쿠키를 기록해야하므로, writeHead.   200은 상태, 
                      // 두 번째 인자로는 헤더내용, 실제 응답받은 브라우저는 mycookie = test라는 쿠키를 저장.
                             
    res.end('Hello Cookie');
});

server.listen(8085, () =>{
    console.log('8082번 포트에서 서버 대기 중!');
});
