/* Regras
A cada rodada, imprima o tabuleiro e pergunte a posição que o jogador deseja jogar
No final do jogo, deve indicar qual jogador ganhou ou se deu velha
Adicionais (opcional)

Permita que o jogador possa "voltar atrás" em qualquer número de jogadas
Permita também o modo jogador vs. computador */

let jogoDaVelha = new Array();
let item1 = [" 1 ", " 2 ", " 3 "],
    item2 = [" 4 ", " 5 ", " 6 "],
    item3 = [" 7 ", " 8 ", " 9 "];

jogoDaVelha.push(item1);
jogoDaVelha.push(item2);
jogoDaVelha.push(item3);

for(let i = 0; i < jogoDaVelha.length; i++)
{
    console.log(jogoDaVelha[i][0] + ' | ' + jogoDaVelha[i][1] + ' | ' + jogoDaVelha[i][2]);
}
