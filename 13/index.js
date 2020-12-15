const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

// PART 1
const part1 = () => {
    const earliestDeparture = Number(lines[0]);
    const busLines = lines[1].split(',').filter(l => l !== 'x').map(Number);

    const nextDepartures = busLines.map(line => Math.ceil(earliestDeparture / line) * line);
    const sortedDepartures = [...nextDepartures].sort((a, b) => a - b);

    const timeUntilDeparture = sortedDepartures[0] - earliestDeparture;
    const bestBusId = busLines[nextDepartures.indexOf(sortedDepartures[0])];

    return timeUntilDeparture * bestBusId;
}

console.log('PART 1:', part1());


// PART 2
const part2 = () => {

    const busLines = lines[1].split(',').map(Number);

    const increment = Math.max(...busLines.filter(l => !isNaN(l)));
    const offsetOfIncrement = busLines.indexOf(increment);

    let t = 0;

    while (true) {
        let isResult = true;

        for (let offset = 0; offset < busLines.length; offset++) {
            if (isNaN(busLines[offset]))
                continue;

            if ((t - offsetOfIncrement + offset) % busLines[offset] !== 0) {
                isResult = false;
                break;
            }
        }

        if (isResult)
            return t - offsetOfIncrement;

        t += increment;
    }
}

console.log('PART 2:', part2());