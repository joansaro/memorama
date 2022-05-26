let number = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

let tarjetasDestapadas = 0;
let cardOne = null;
let cardTwo = null;
let firstResult = null;
let secondResult = null;
let movimientos = null;
let aciertos = null;
let temporizador = false;
let timer = 30;
let timerInitial = 30;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

// apuntado a documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');




number = number.sort(() => { return Math.random() - 0.5 });
console.log(number);





const contarTiempo = () => {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} s`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
            mostrarAciertos.innerHTML = `Lo siento`;
            mostrarTiempo.innerHTML = `Perdiste 😭`
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😵`;
            document.getElementById('reset').classList.add ("reset");
            document.getElementById('reset').classList.remove ("reset-hidden");
            document.getElementById('reset').innerHTML = `Jugar de nuevo`;
        }
    }, 1000);
};

const bloquearTarjetas = () => {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${number[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
};


const destapar = (id) => {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    // console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //    Mostrar primer numero

        cardOne = document.getElementById(id);
        firstResult = number[id];
        cardOne.innerHTML = `<img src="./images/${firstResult}.png" alt="">`;
        clickAudio.play();

        // Desabilitar boton
        cardOne.disabled = true;

    } else if (tarjetasDestapadas == 2) {
        // Mostrar segunfo numero
        cardTwo = document.getElementById(id);
        secondResult = number[id]
        cardTwo.innerHTML = `<img src="./images/${secondResult}.png" alt="">`;

        // Desabilitar segundo boton
        cardTwo.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`

        if (firstResult == secondResult) {
            // reset counter
            tarjetasDestapadas = 0;

            // aumentar aciertos
            aciertos++
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`
            rightAudio.play();
            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML = `Fantastico 🎉, solo demoraste ${timerInitial - timer} s`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
                document.getElementById('reset').classList.add ("reset");
                document.getElementById('reset').classList.remove ("reset-hidden");
                document.getElementById('reset').innerHTML = `Jugar de nuevo`;

                winAudio.play();
            }
        } else {
            // mostrar momentaneamente valores y volvera tapar
            wrongAudio.play();
            setTimeout(() => {
                cardOne.innerHTML = ' ';
                cardTwo.innerHTML = ' ';
                cardOne.disabled = false;
                cardTwo.disabled = false;
                tarjetasDestapadas = 0;
            }, 800)
        }
    }
};



const resetear = () => {

    // Reiniciar variables
    number = number.sort(() => { return Math.random() - 0.5 });

    tarjetasDestapadas = 0;
    cardOne = null;
    cardTwo = null;
    firstResult = null;
    secondResult = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = 30;
    timerInitial = 30;

    // Reiniciar tiempo
    clearInterval(tiempoRegresivoId);
    mostrarTiempo.innerHTML = `Tiempo: ${timer} s`;

    // Reiniciar movimientos
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    // Reiniciar aciertos
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

    // Reiniciar tarjetas
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = `<img src="./images/back.png" alt="">`;
        tarjeta.disabled = false;
    }

    document.getElementById('reset').classList.add ("reset-hidden");
    document.getElementById('reset').classList.remove ("reset");
    document.getElementById('reset').innerHTML = ``;

};