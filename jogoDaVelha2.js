class JogoDaVelha {
    tabuleiro;
    jogada;
    estado;

    constructor() {
        this.tabuleiro = new Array(9).fill(null);
        this.jogada = "X";
        this.estado = [];
    }

    // Altera o jogador a cada "jogada"
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
        if(this.tabuleiro[i]) {
            return;
        }
        this.tabuleiro[i] = this.jogada;
    }

    deuVelha() {
        this.tabuleiro.fill("😑");
    }

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

    finalDeJogo() {
        console.log("Vitoria")
        return !!this.designarVencedor();
    }

    salvar() {
        console.log("salvei");
        const clone = structuredClone(jogo)
        this.estado.push(clone.tabuleiro);
    }

}

class JogoDaVelhaView {
    constructor() {
    }

    atualizaJogo(jogo) {
        if (!jogo.tabuleiro.includes(null) && !jogo.finalDeJogo()) {
            jogo.deuVelha();
        }
        this.atualizaTurno(jogo);
        const vitoria = jogo.designarVencedor();
        for (let i=0; i < jogo.tabuleiro.length; i++) {
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
}

function adicionarJogada(i) {
    jogo.fazerJogada(i);
    jogoView.atualizaJogo(jogo);
    jogo.salvar();
    jogo.proximaJogada();
}

function novoJogo() {
    jogo = new JogoDaVelha();
    jogoView.atualizaJogo(jogo);
}

function voltarJogada() {
    if (jogo.estado.length >= 1) {
        jogo.tabuleiro = jogo.estado[jogo.estado.length - 2];
        jogo.estado.pop();
        jogoView.atualizaJogo(jogo);
    }
}

let jogo = new JogoDaVelha();
let jogoView = new JogoDaVelhaView();

document.querySelector("#iniciaJogo")
    .addEventListener("click", () => {
        novoJogo();
    })


document.querySelector("#voltar")
    .addEventListener("click", () => {
        voltarJogada();
    })

let quadrados = document.querySelectorAll(".quadrado");

quadrados.forEach((quadrado) => {
    quadrado.addEventListener("click", () => {
        adicionarJogada(quadrado.dataset.index);
    })
})
