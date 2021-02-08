const ss = setInterval( () => {
    console.log('start');
    try{
        throw new Error('server Error!! Erra da Erra');
    }catch(err){
        console.error(err);
    }
}, 1000);

