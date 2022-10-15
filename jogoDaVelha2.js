class JogoDaVelha {
    board;
    turn;

    constructor() {
        this.board = new Array(9).fill(null);
        this.turn = "X";
    }


}

let jogo = new JogoDaVelha();

console.log(jogo);