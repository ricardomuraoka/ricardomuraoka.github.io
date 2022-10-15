/* Regras
A cada rodada, imprima o tabuleiro e pergunte a posição que o jogador deseja jogar
No final do jogo, deve indicar qual jogador ganhou ou se deu velha
Adicionais (opcional)

Permita que o jogador possa "voltar atrás" em qualquer número de jogadas
Permita também o modo jogador vs. computador */

let jogoDaVelha = new Array(9).fill(null)
const i = 0;

    console.log(jogoDaVelha[i] + ' | ' + jogoDaVelha[i+1] + ' | ' + jogoDaVelha[i+2]);
    console.log(jogoDaVelha[i+3] + ' | ' + jogoDaVelha[i+4] + ' | ' + jogoDaVelha[i+8]);
    console.log(jogoDaVelha[i+6] + ' | ' + jogoDaVelha[i+7] + ' | ' + jogoDaVelha[i+8]);

let p1Move = function () {
    return ("Digite o número correspondente para realizar a sua jogada | 1 a 9 ");
}

console.log(p1Move())


