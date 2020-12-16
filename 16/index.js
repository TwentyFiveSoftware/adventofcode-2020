const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');


const rules = new Set();
const ticketFields = [];

for (let i = 0; ; i++) {
    if (lines[i] === '')
        break;

    const validNumbers = [];

    const ranges = lines[i].split(':')[1].split(' or ');
    for (const range of ranges) {
        const min = Number(range.split('-')[0]);
        const max = Number(range.split('-')[1]);

        for (let j = min; j <= max; j++) {
            rules.add(j);
            validNumbers.push(j);
        }
    }

    ticketFields.push({name: lines[i].split(':')[0], validNumbers});
}

const yourTicked = lines[lines.indexOf('your ticket:') + 1].split(',').map(Number);
const nearbyTickets = lines.slice(lines.indexOf('nearby tickets:') + 1).map(line => line.split(',').map(Number));


// PART 1
const part1 = () => {
    const errors = [];

    const nearbyTicketMapping = [];
    nearbyTickets.forEach(ticket => nearbyTicketMapping.push(...ticket));

    for (const field of nearbyTicketMapping)
        if (!rules.has(field))
            errors.push(field);

    return errors.reduce((sum, curr) => sum + curr, 0)
}

console.log('PART 1:', part1());
