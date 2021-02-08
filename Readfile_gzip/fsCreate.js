const fs = require('fs');

fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
  
  
  if (err) { // js파일 있는 곳에 folder라는 것 없음.


    if (err.code === 'ENOENT') { // 폴더가 없을 때 에러코드가 ENOENT
      console.log('폴더 없음');

      fs.mkdir('./folder', (err) => { // fs.mkdir은 폴더가 이미 있으면 에러! 항상 access()로 호출하고나서 사용.
        if (err) {
          throw err;
        }
        console.log('폴더 만들기 성공');
        fs.open('./folder/file.js', 'w', (err, fd) => {// 파일이 없다면 파일을 생성하고 경로대로 실행. 
          if (err) {
            throw err;
          }

          console.log('빈 파일 만들기 성공', fd);

          const ws = fs.createWriteStream('./folder/file.js');
          ws.write("new file w");
          ws.end();

          fs.rename('./folder/file.js', './folder/newfile.js', (err) => {// fs.rename(기존경로, 새 경로, 콜백) 
            if (err) {
              throw err;
            }
            console.log('이름 바꾸기 성공');
          });
        });
      });
    } 
    
    else {
      throw err;
    }

  } 
  
  else {
    console.log('이미 폴더 있음');
  }


});