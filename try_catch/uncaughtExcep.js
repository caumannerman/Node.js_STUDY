process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버를고장');
}, 1000);

setTimeout(() => {
    console.log('실행됨');
}, 2000);