let turno = 1;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

botones.forEach(x => x.addEventListener("click", ponerFicha));

function ponerFicha(event) {
    let botonPulsado = event.target;
    if (!partidaAcabada && botonPulsado.innerHTML == "") {
        botonPulsado.innerHTML = fichas[turno];
        puestas += 1;

        let estadoPartida = estado();
        if (estadoPartida == 0) {
            cambiarTurno();
            if (puestas < 9) {
                ia();
                estadoPartida = estado();
                puestas += 1;
                cambiarTurno();
            }
        }

        if (estadoPartida == 1) {
            textoVictoria.style.visibility = "visible";
            partidaAcabada = true;
        }
        else if (estadoPartida == -1) {
            textoVictoria.innerHTML = "Has Perdido 😢";
            partidaAcabada = true;
            textoVictoria.style.visibility = "visible";
        }
        else if (estadoPartida == 0 && puestas == 9) {
            textoVictoria.innerHTML = "Has empatado 😅";
            partidaAcabada = true;
            textoVictoria.style.visibility = "visible";
            resetButton();
        }
    }
};

function cambiarTurno() {
    if (turno == 1) {
        turno = 0;
    }
    else {
        turno = 1;
    }
};

function estado() {
    posicionVictora = 0;
    nEstado = 0;

    function sonIguales(...args) {
        valores = args.map(x => x.innerHTML);
        if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
            args.forEach(x => x.style.backgroundColor = "lightgreen");
            return true;
        }
        else {
            return false;
        }
    };

    if (sonIguales(botones[0], botones[1], botones[2])) {
        posicionVictora = 1;
        resetButton();
    }
    else if (sonIguales(botones[3], botones[4], botones[5])) {
        posicionVictora = 1;
        resetButton();
    }
    else if (sonIguales(botones[6], botones[7], botones[8])) {
        posicionVictora = 1;
        resetButton();
    }
    else if (sonIguales(botones[0], botones[3], botones[6])) {
        posicionVictora = 1;
        resetButton();
    }
    else if (sonIguales(botones[1], botones[4], botones[7])) {
        posicionVictora = 1;
        resetButton();
    }
    else if (sonIguales(botones[2], botones[5], botones[8])) {
        posicionVictora = 1;
        resetButton();
    }
    else if (sonIguales(botones[0], botones[4], botones[8])) {
        posicionVictora = 1;
        resetButton();
    }
    else if (sonIguales(botones[2], botones[4], botones[6])) {
        posicionVictora = 1;
        resetButton();
    }

    if (posicionVictora > 0) {
        if (turno == 1) {
            nEstado = 1;
        }
        else {
            nEstado = -1;
        }
    }
    return nEstado;
};

function ia() {
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let valores = botones.map(x => x.innerHTML);
    let pos = -1;

    if (valores[4] == "") {
        pos = 4;
    }
    else {
        let n = aleatorio(0, botones.length - 1);
        while (valores[n] != "") {
            n = aleatorio(0, botones.length - 1);
        }
        pos = n;
    }

    botones[pos].innerHTML = "O";
    return pos;
};


const resetButton = () => {
    document.getElementById('reset').classList.add("reset");
    document.getElementById('reset').classList.remove("reset-hidden");
    document.getElementById('reset').innerHTML = `Jugar de nuevo`;
};

const resetear = () => {
    botones.forEach(x => x.innerHTML = "");
    botones.forEach(x => x.style.backgroundColor = "white");
    textoVictoria.style.visibility = "hidden";
    partidaAcabada = false;
    puestas = 0;
    turno = 1;

    document.getElementById('reset').classList.add ("reset-hidden");
    document.getElementById('reset').classList.remove ("reset");
    document.getElementById('reset').innerHTML = ``;
};
