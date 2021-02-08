const fs = require('fs');

fs.readdir('./folder', (err, dir) => { // readdir(경로, 콜백) ==> 안의 내용물이 dir배열에 담김
  if (err) {
    throw err;
  }
  console.log('폴더 내용 확인', dir);
  fs.unlink('./folder/newFile.js', (err) => { // 파일삭제  파일 없으면 오류
    if (err) {
      throw err;
    }
    console.log('파일 삭제 성공');
    fs.rmdir('./folder', (err) => { // 폴더 지움. 폴더 안에 파일 있으면 에러. 안에 먼저 다 지우고 해야함.
      if (err) {
        throw err;
      }
      console.log('폴더 삭제 성공');
    });
  });
});