const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');
const numbers = lines.map(l => Number(l));


// PART 1
for (let i = 0; i < numbers.length; i++)
    for (let j = i; j < numbers.length; j++)
        if (numbers[i] + numbers[j] === 2020)
            console.log('PART 1', numbers[i], numbers[j], numbers[i] * numbers[j]);


// PART 2
for (let i = 0; i < numbers.length; i++)
    for (let j = i; j < numbers.length; j++)
        for (let k = j; k < numbers.length; k++)
            if (numbers[i] + numbers[j] + numbers[k] === 2020)
                console.log('PART 2', numbers[i], numbers[j], numbers[k], numbers[i] * numbers[j] * numbers[k]);
