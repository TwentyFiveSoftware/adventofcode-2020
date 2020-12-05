const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');


// PART 1
const parseLine = line => {
    const row = line.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1');
    const column = line.substr(-3, 3).replace(/L/g, '0').replace(/R/g, '1');
    return parseInt(row, 2) * 8 + parseInt(column, 2);
}

const result = lines.map(parseLine);
result.sort((a, b) => b - a);

console.log('PART 1:', result[0]);


// PART 2
const emptySeat = result.slice(0, -1).find((e, i, arr) => arr[i + 1] !== e - 1) - 1;
console.log('PART 2:', emptySeat);