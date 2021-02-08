const fs = require('fs');



// readStream은     """이벤트 리스너"""   를 붙여서 사용!  보통 data, end, error 이벤트를 사용.
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});//highWaterMark가 버퍼크기 정해줌. 16이면 16B
//data 만들어주고.
const data = [];
//console.log(typeof readStream, Object.prototype.toString.call(readStream));
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) =>{
    console.log('error :', err);
});

//writeStream도 같은 방식으로.  
//writeStream.on('finish', ()=> {
 //   console.log('파일 쓰기 완료');
// });
//writeStream.write('이 글을 파일에');
//.....
//writeStream.end();