/* Regras
A cada rodada, imprima o tabuleiro e pergunte a posição que o jogador deseja jogar
No final do jogo, deve indicar qual jogador ganhou ou se deu velha
Adicionais (opcional)

Permita que o jogador possa "voltar atrás" em qualquer número de jogadas
Permita também o modo jogador vs. computador */

let jogoDaVelha = new Array(9).fill(null)
const i = 0;

function imprimeJogo() {
    console.log("DIGITE O NUMERO PARA SELECIONAR SUA JOGADA")
    console.log("  1  " + ' | ' + "  2  " + ' | ' + "  3  ");
    console.log("  4  " + ' | ' + "  5  " + ' | ' + "  6  ");
    console.log("  7  " + ' | ' + "  8  " + ' | ' + "  9  ");
}

let player1 = {
    jogada: "X"
}

let player2 = {
    jogada: "O"
}

imprimeJogo();


