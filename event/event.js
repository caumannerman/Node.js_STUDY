const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => { // addListener과 on 은 기능이 같다.
  console.log('이벤트 1');
});

myEvent.on('event2', () => {
  console.log('이벤트 2');
});

myEvent.on('event2', () => {
  console.log('이벤트 2 추가');;
});

myEvent.once('event3', () => { // .once는 한 번만 실행되는 이벤트. 
  console.log('이벤트 3');
}); 

myEvent.emit('event1'); // 이벤트 호출 ( 인자로 이벤트 이름을 넣어줌 ==> 미리등록해둔 이벤트 콜백이 실행됨.)
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3');
myEvent.emit('event3'); // 실행 안 됨

myEvent.on('event4', () => {
  console.log('이벤트 4');
});
myEvent.removeAllListeners('event4'); // 인자로 전달된 이벤트명의 리스너만 모두 제거
myEvent.emit('event4'); // 실행 안 됨

const listener = () => {
  console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener); // 하나만 제거
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2'));
