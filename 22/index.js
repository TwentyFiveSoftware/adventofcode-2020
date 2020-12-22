const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const player1 = [];
const player2 = [];

let currentPlayer = 1;

for (const line of lines) {
    if (line.startsWith('Player 2:')) {
        currentPlayer = 2;
        continue;
    }

    if (line === '' || line === 'Player 1:')
        continue;

    if (currentPlayer === 1) player1.push(Number(line));
    if (currentPlayer === 2) player2.push(Number(line));
}

while (player1.length !== 0 && player2.length !== 0) {
    if (player1[0] > player2[0]) {
        player1.push(player1.splice(0, 1)[0]);
        player1.push(player2.splice(0, 1)[0]);
    } else {
        player2.push(player2.splice(0, 1)[0]);
        player2.push(player1.splice(0, 1)[0]);
    }
}

const winningPlayer = player1.length === 0 ? player2 : player1;
winningPlayer.reverse();
const score = winningPlayer.reduce((prev, curr, i) => prev + curr * (i + 1), 0);

console.log('PART 1:', score);