const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');


// PART 1
const countPart1 = lines.reduce((count, line, i) => {
    const char = line.charAt((i * 3) % line.length);
    return count + (char === '#' ? 1 : 0);
}, 0);

console.log('PART 1:', countPart1);


// PART 2
let resultPart2 = 1;

for (const {right, down} of [
    {right: 1, down: 1},
    {right: 3, down: 1},
    {right: 5, down: 1},
    {right: 7, down: 1},
    {right: 1, down: 2},
]) {
    let sum = 0;

    for (let i = 0; i < lines.length; i += down) {
        const char = lines[i].charAt(((i / down) * right) % lines[i].length);
        sum += (char === '#' ? 1 : 0);
    }

    resultPart2 *= sum;
}

console.log('PART 2:', resultPart2);

