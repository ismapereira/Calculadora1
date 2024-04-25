let totalRodando = 0;
let buffer = "0";
let anteriorOperador;

const tela = document.querySelector('.tela');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    tela.innerText = buffer
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            totalRodando = 0;
            break;
        case '=':
            if(anteriorOperador === null){
                return
            }
            flushOperation(parseInt(buffer));
            anteriorOperador = null;
            buffer = totalRodando;
            totalRodando = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            } else{
                buffer = buffer.toString(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;        

    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(totalRodando === 0){
        totalRodando = intBuffer;
    } else{
        flushOperation(intBuffer);
    }
    anteriorOperador = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(anteriorOperador === '+'){
        totalRodando += intBuffer;
    } else if(anteriorOperador === '−'){
        totalRodando -= intBuffer;
    } else if(anteriorOperador === '×'){
        totalRodando *= intBuffer;
    } else if(anteriorOperador === '÷'){
        totalRodando /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    } else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.botoes').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();