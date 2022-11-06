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

    turnoComputador() {
        if (this.deuVelha()) {
            return;
        }
        let jogadaComputador = Math.floor(Math.random() * 9);
        if (this.tabuleiro[jogadaComputador] !== "X" && this.tabuleiro[jogadaComputador] !== "O") {
            return jogadaComputador;
        } else {
            jogadaComputador = this.turnoComputador();
        }
        return jogadaComputador;
    }

    // Imprime o quadrado do jogo da velha
    fazerJogada(i) {
        let r;
        if (this.finalDeJogo()) {
            this.proximaJogada();
            return;
        }
        if (this.tabuleiro[i] === "X" || this.tabuleiro[i] === "O") {
            this.proximaJogada();
            return;
        }
        if (tipoJogo === true) {
            this.tabuleiro[i] = this.jogada;
        } else {
            this.jogada = "X";
            this.salvar(i);
            this.tabuleiro[i] = this.jogada;
            if (this.finalDeJogo()) {
                return;
            } else {
                this.proximaJogada();
                r = this.turnoComputador();
                this.salvar(r);
                this.tabuleiro[r] = this.jogada;
            }
        }
    }

    deuVelha() {
        return !jogo.tabuleiro.includes(null) && !jogo.finalDeJogo() &&
            !isEqual([null, null, null, null, null, null, null, null, null], jogo.tabuleiro);
    }

    // Verifica se há um vencedor, e caso haja, retorna o vencedor.
    designarVencedor() {
        const jogadasVitoria = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (const vitoria of jogadasVitoria) {
            const [x, y, z] = vitoria;
            if (this.tabuleiro[x] &&
                (this.tabuleiro[x] === this.tabuleiro[y] && this.tabuleiro[x] === this.tabuleiro[z])) {
                return vitoria;
            }
        }
        return null;
    }

    voltarJogada() {
        const jogadorVencedor = document.querySelector("#jogador-vencedor");
        jogadorVencedor.innerHTML = `<h3 class=""></h3>`;
        if (isEqual(this.tabuleiro, [null, null, null, null, null, null, null, null, null])) {
            alert("Não há jogadas para voltar");
            return;
        }

        if (this.estado.length === 0) {
            this.tabuleiro = new Array(9).fill(null);
            return;
        }

        if (tipoJogo === true) {
            this.tabuleiro = this.estado[this.estado.length - 1];
            this.estado.pop();
            this.proximaJogada();
            return this;
        } else {
            this.estado.pop();
            this.tabuleiro = this.estado[this.estado.length - 1];
            this.estado.pop();
            this.tabuleiro = this.estado[this.estado.length - 1];
            this.estado.pop();
            return this;
        }
    }

    // Retorna true caso haja um vencedor, false caso contrário.
    finalDeJogo() {
        let jogadasVitoria = this.designarVencedor();
        return !!jogadasVitoria;
    }

    // Salva o estado atual do jogo, para que seja possível retornar jogadas.
    salvar(i) {
        if (this.tabuleiro[i] === "X" || this.tabuleiro[i] === "O") {
            return;
        }
        const clone = structuredClone(jogo)
        this.estado.push(clone.tabuleiro);
    }
}

// Gera a interação do nosso jogo em uma view visualizável.
class JogoDaVelhaView {
    constructor() {
    }

    atualizaJogo(jogo) {
        const deuVelha = jogo.deuVelha();
        if (jogo.deuVelha()) {
            jogo.tabuleiro.fill("😑");
        }

        this.atualizaTurno(jogo);
        const vitoria = jogo.designarVencedor();
        for (let i = 0; i < jogo.tabuleiro.length; i++) {
            const quadrado = document.querySelector(`.quadrado[data-index='${i}']`)
            const jogadorVencedor = document.querySelector("#jogador-vencedor");


            if (quadrado !== null) {
                quadrado.classList.remove("vencedor");
            } else {
                continue;
            }


            if (!vitoria && deuVelha) {
                jogadorVencedor.innerHTML = `<h3 class=""></h3>`;
            }


            let estiloQuadrado = jogo.tabuleiro[i] === 'X' ? "x" : "o";
            quadrado.innerHTML = `<span class="${estiloQuadrado}">${jogo.tabuleiro[i] ? jogo.tabuleiro[i] : ""}</span>`

            if (vitoria && vitoria.includes(i)) {
                quadrado.classList.add("vencedor");
            }

            if (deuVelha === false && vitoria && vitoria.includes(i)) {
                jogadorVencedor.innerHTML = `<h3>O jogador ${jogo.jogada} venceu!</h3>`;
            }

            if (deuVelha) {
                jogadorVencedor.innerHTML = `<h3>Deu velha!</h3>`;
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

let jogo = new JogoDaVelha(); // Instancia um novo jogo.
let jogoView = new JogoDaVelhaView(); // Instancia a view do jogo.
let tipoJogo = true; // true = 1 jogador, false = 2 jogadores (Permite acompanhar o tipo de jogo)

// Adiciona os eventos de click para iniciar um novo jogo modo 2 jogadores.
document.querySelector("#iniciaJogo")
    .addEventListener("click", () => {
        novoJogo();
        tipoJogo = true;
        const jogadorVencedor = document.querySelector("#jogador-vencedor");
        jogadorVencedor.innerHTML = `<h3 class=""></h3>`;
    })

// Adiciona os eventos de click para iniciar um novo jogo modo 1 jogador.
document.querySelector("#iniciaJogoIA")
    .addEventListener("click", () => {
        novoJogo();
        tipoJogo = false;
        const jogadorVencedor = document.querySelector("#jogador-vencedor");
        jogadorVencedor.innerHTML = `<h3 class=""></h3>`;
    })

// Adiciona os eventos de click para voltar uma jogada.
document.querySelector("#voltar")
    .addEventListener("click", () => {
        voltar();
    })

// Visão geral do tabuleiro (que dividem a classe "quadrado").
let quadrados = document.querySelectorAll(".quadrado");

// Adiciona os eventos de click para cada quadrado do tabuleiro.
if (tipoJogo) {
    quadrados.forEach((quadrado) => {
        quadrado.addEventListener("click", () => {
            adicionarJogada(quadrado.dataset.index);
        })
    })
} else {
    quadrados.forEach((quadrado) => {
        quadrado.addEventListener("click", () => {
            adicionarJogada(quadrado.dataset.index);
        })
    })
}

// Permite definir se o tabuleiro é igual aos jogos salvos.
function isEqual(a, b) {
    if (a.length !== b.length)
        return false;
    else {
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
}