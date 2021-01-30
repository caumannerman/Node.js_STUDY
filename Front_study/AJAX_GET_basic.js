
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){ //요청에 대한 콜백
  if (xhr.readyState === xhr.DONE){ // 요청이 완료되면, 
    if (xhr.status === 200 || xhr.status === 201) {
      console.log(xhr.responseText); // 서버에서 보내주는 값.
    } else{
      console.error(xhr.responseText);
    }
  }
};
xhr.open('GET', 'https://www.~~~~/api/get'); // 메서드와 주소 설정
xhr.send(); //요청 전송

// onreadystatechange 대신 onload와 onerror로 성공과 실패를 구별해도 된다. 아래와 같이.

/*
var xhr = new XMLHttpRequest();
xhr.onload = function(){
    if (xhr.status === 200 || xhr.status === 201){
        console.log(xhr.responseText);
    }
};

xhr.onerror = function(){
    console.error(xhr.responseText);
};

xhr.open('GET', 'https://www.~~~~~');
xhr.send(); 와 같이!!
*/


