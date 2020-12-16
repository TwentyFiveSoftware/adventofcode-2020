const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

const startingNumbers = file.split(',').map(Number);

// PART 1
const part1 = () => {
    const turns = [...startingNumbers];

    for (let turn = turns.length; turn < 2020; turn++) {
        const lastNumber = turns[turns.length - 1];

        const lastTurnDifference = turns.reverse().slice(1).indexOf(lastNumber) + 1;
        turns.reverse();

        turns.push(lastTurnDifference);
    }

    return turns[turns.length - 1];
}

console.log('PART 1:', part1());


// PART 2
const part2 = () => {
    const numbers = [];
    let lastNumber = 0;

    for (let i = 0; i < startingNumbers.length; i++) {
        lastNumber = startingNumbers[i]
        numbers[lastNumber] = i + 1;
    }

    for (let turn = startingNumbers.length; turn < 30000000; turn++) {
        if (numbers[lastNumber] === undefined)
            numbers[lastNumber] = turn;

        if (numbers[lastNumber] === turn) {
            lastNumber = 0;
            continue;
        }

        const lastTurn = numbers[lastNumber];
        numbers[lastNumber] = turn;
        lastNumber = turn - lastTurn;

        if (turn % 10000 === 0)
            console.log(turn, Object.keys(numbers).length)
    }

    return lastNumber;
}

console.log('PART 2:', part2());