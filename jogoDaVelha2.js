class JogoDaVelha {
    tabuleiro;
    jogada;
    estado;

    constructor() {
        this.tabuleiro = new Array(9).fill(null);
        this.jogada = "X";
        this.estado = [];
    }

    // Alterna entre jogador X e jogador O
    proximaJogada() {
        if (this.jogada === "X") {
            this.jogada = "O";
        } else {
            this.jogada = "X";
        }
    }

    // Verifica se há um jogador
    fazerJogada(i) {
        if (this.finalDeJogo()){
            return;
        }
        if (this.tabuleiro[i] === "X" || this.tabuleiro[i] === "O") {
            this.proximaJogada();
            return;
        }
        console.log(this.estado)
        console.log(this.tabuleiro)
        this.tabuleiro[i] = this.jogada;
    }

    deuVelha() {
        this.tabuleiro.fill("😑");
    }

    // Verifica se há um vencedor
    designarVencedor() {
        const jogadasVitoria = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for (const vitoria of jogadasVitoria) {
            const [x,y,z] = vitoria;

            if (this.tabuleiro[x] &&
            (this.tabuleiro[x] === this.tabuleiro[y] && this.tabuleiro[x] === this.tabuleiro[z])) {
                return vitoria;
            }
        }
        return null;
    }

    voltarJogada() {
        if (isEqual(this.tabuleiro, [null, null, null, null, null, null, null, null, null])) {
            return;
        }
        try {
            if (this.estado.length === 0) {
                this.tabuleiro = new Array(9).fill(null);
                return;
            }
            this.tabuleiro = this.estado[this.estado.length - 1];
            console.log(this.tabuleiro)
            console.log(this.estado)
            console.log(this.estado.length)
            this.estado.pop();
            this.proximaJogada()
            return this;
        } catch (err) {
            console.log("Não é mais possivel voltar");
        }
    }

    finalDeJogo() {
        let jogadasVitoria = this.designarVencedor();
        if (jogadasVitoria) {
            console.log("Vitoria")
            return true;
        } else {
            return false;
        }
    }

    salvar(i) {
        if(this.tabuleiro[i] === "X" || this.tabuleiro[i] === "O") {
            return;
        }
        const clone = structuredClone(jogo)
        this.estado.push(clone.tabuleiro);
    }
}

class JogoDaVelhaIA {
    tabuleiro;
    jogada;
    estado;

    constructor() {
        this.tabuleiro = new Array(9).fill(null);
        this.jogada = "X";
        this.estado = [];
    }

    // Alterna entre jogador X e jogador O
    proximaJogadaIA() {
        if (this.jogada === "X") {
            this.jogada = "O";
        } else {
            this.jogada = "X";
        }
    }


    fazerJogadaIA(i) {
        if (this.finalDeJogo()){
            return;
        }
        if(this.tabuleiro[i]) {
            return;
        }
        console.log(this.estado)
        console.log(this.tabuleiro)
        this.tabuleiro[i] = this.jogada;
    }

    deuVelhaIA() {
        this.tabuleiro.fill("😑");
    }

    // Verifica se há um vencedor
    designarVencedor() {
        const jogadasVitoria = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for (const vitoria of jogadasVitoria) {
            const [x,y,z] = vitoria;

            if (this.tabuleiro[x] &&
                (this.tabuleiro[x] === this.tabuleiro[y] && this.tabuleiro[x] === this.tabuleiro[z])) {
                return vitoria;
            }
        }
        return null;
    }

    voltarJogadaIA() {
        if (isEqual(this.tabuleiro, [null, null, null, null, null, null, null, null, null])) {
            return;
        }
        try {
            if (this.estado.length === 0) {
                this.tabuleiro = new Array(9).fill(null);
                return;
            }
            this.tabuleiro = this.estado[this.estado.length - 1];
            console.log(this.tabuleiro)
            console.log(this.estado)
            console.log(this.estado.length)
            this.estado.pop();
            this.proximaJogada()
            return this;
        } catch (err) {
            console.log("Não é mais possivel voltar");
        }
    }

    finalDeJogoIA() {
        let jogadasVitoria = this.designarVencedor();
        if (jogadasVitoria) {
            console.log("Vitoria")
            return true;
        } else {
            return false;
        }
    }

    salvarIA(i) {
        if(this.tabuleiro[i] === "X" || this.tabuleiro[i] === "O") {
            return;
        }
        console.log("salvei");
        const clone = structuredClone(jogo)
        this.estado.push(clone.tabuleiro);
    }
}

class JogoDaVelhaView {
    constructor() {
    }

    atualizaJogo(jogo) {
        if (!jogo.tabuleiro.includes(null) && !jogo.finalDeJogo() && !isEqual([null, null, null, null, null, null, null, null, null], jogo.tabuleiro)) {
            jogo.deuVelha();
        }

        this.atualizaTurno(jogo);
        const vitoria = jogo.designarVencedor();
        for (let i = 0; i < jogo.tabuleiro.length; i++) {
            const quadrado = document.querySelector(`.quadrado[data-index='${i}']`)

            quadrado.classList.remove("vencedor");

            let estiloQuadrado = jogo.tabuleiro[i] === 'X' ? "x" : "o";
            quadrado.innerHTML = `<span class="${estiloQuadrado}">${jogo.tabuleiro[i] ? jogo.tabuleiro[i] : ""}</span>`

            if (vitoria && vitoria.includes(i)) {
                quadrado.classList.add("vencedor");
            }
        }
    }

    atualizaTurno(jogo) {
        let jogador1 = document.querySelector("#x");
        let jogador2 = document.querySelector("#o");

        jogador1.classList.remove('active');
        jogador2.classList.remove('active')


        if (jogo.jogada === "X") {
            jogador1.classList.add('active')
        } else {
            jogador2.classList.add('active')
        }
    }

    async exibeVencedor(jogo) {
        const vitoria = jogo.designarVencedor();
        let vencedor;
        if (vitoria) {
            vencedor =  jogo.jogada === "X" ? "O" : "X";
        }
        return vencedor;
    }
}

function adicionarJogada(i) {
    jogo.salvar(i);
    jogo.fazerJogada(i);
    jogoView.atualizaJogo(jogo);
    jogo.proximaJogada();
}

function voltar() {
    jogo.voltarJogada();
    jogoView.atualizaJogo(jogo);
}

function novoJogo() {
    jogo = new JogoDaVelha();
    jogoView.atualizaJogo(jogo);
}

function adicionarJogadaIA(i) {
    jogoIA.salvarIA(i);
    jogoIA.fazerJogadaIA(i);
    jogoView.atualizaJogo(jogoIA);
    jogoIA.proximaJogadaIA();
}

function voltarIA() {
    jogoIA.voltarJogadaIA();
    jogoView.atualizaJogo(jogoIA);
}

function novoJogoIA() {
    jogoIA = new JogoDaVelhaIA();
    jogoView.atualizaJogo(jogoIA);
}

let jogo = new JogoDaVelha();
let jogoView = new JogoDaVelhaView();
let jogoIA = new JogoDaVelhaIA();
let tipoJogo = true;

document.querySelector("#iniciaJogo")
    .addEventListener("click", () => {
        novoJogo();
    })

document.querySelector("#iniciaJogoIA")
    .addEventListener("click", () => {
        novoJogoIA();
        console.log(tipoJogo)
    })


document.querySelector("#voltar")
    .addEventListener("click", () => {
        voltar();
    })

let quadrados = document.querySelectorAll(".quadrado");

if (tipoJogo) {
    quadrados.forEach((quadrado) => {
        quadrado.addEventListener("click", () => {
            adicionarJogada(quadrado.dataset.index);
        })
    })
} else {
    quadrados.forEach((quadrado) => {
        quadrado.addEventListener("click", () => {
            adicionarJogadaIA(quadrado.dataset.index);
        })
    })
}

function isEqual(a, b) {
    if(a.length!==b.length)
        return false;
    else {
        for(let i=0; i<a.length; i++)
            if(a[i]!==b[i])
                return false;
        return true;
    }
}