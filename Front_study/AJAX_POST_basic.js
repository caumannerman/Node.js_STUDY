var xhr = new XMLHttpRequest();
var data = {
    name: 'yy',
    birth: 1994,
};
xhr.onreadystatechange = function(){
    if(xhr.readyState === xhr.DONE){
        if(xhr.status === 200 || xhr.status === 201){
            console.log(xhr.responseText);
        }else{
            console.error(xhr.responseText);
        }
    }
};
xhr.open('POST', 'https://www.~~~~~');
xhr.setRequestHeader('Content-Type', 'application/json'); // 콘텐츠 타입을 json으로
xhr.send(JSON.stringify(data)); //데이터를 동봉해 전송