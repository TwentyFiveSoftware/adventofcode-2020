const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const mappings = lines.map(line => line.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/))


// PART 1
const countPart1 = mappings.reduce((count, curr) => {
    const [_, min, max, char, password] = curr;

    const occurrences = (password.match(new RegExp(char, 'g')) || []).length;
    return count + (min <= occurrences && max >= occurrences ? 1 : 0);
}, 0);

console.log('PART 1:', countPart1);


// PART 2
const countPart2 = mappings.reduce((count, curr) => {
    const [_, firstPos, secondPos, char, password] = curr;
    return count + ((password[firstPos - 1] === char) ^ (password[secondPos - 1] === char));
}, 0);

console.log('PART 2:', countPart2);