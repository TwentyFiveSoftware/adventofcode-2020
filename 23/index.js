const fs = require('fs');

const line = fs.readFileSync('./input.txt', 'utf-8');

let cups = line.split('').map(Number);
let currentCupLabel = cups[0];

for (let move = 0; move < 100; move++) {
    let save = [...cups];
    const cupIndexSave = cups.indexOf(currentCupLabel);

    let pickedCups = cups.splice(cups.indexOf(currentCupLabel) + 1, 3);
    pickedCups.push(...cups.splice(0, 3 - pickedCups.length));

    let currentCupIndex = cups.indexOf(currentCupLabel);
    let destinationCupLabel = cups[currentCupIndex] - 1;

    while (!cups.includes(destinationCupLabel)) {
        destinationCupLabel--;

        if (destinationCupLabel < Math.min(...cups))
            destinationCupLabel = Math.max(...cups);
    }

    console.log(destinationCupLabel)

    let destinationCupIndex = cups.indexOf(destinationCupLabel);

    console.log(move + 1, save.map(s => s === currentCupLabel ? `(${s})` : s).join(' '), pickedCups, destinationCupLabel)

    currentCupIndex++;
    if (currentCupIndex >= cups.length)
        currentCupIndex = 0;

    currentCupLabel = cups[currentCupIndex];

    cups = [...cups.splice(0, destinationCupIndex + 1), ...pickedCups, ...cups];

    while (cups.indexOf(currentCupLabel) !== (cupIndexSave + 1 >= cups.length ? 0 : cupIndexSave + 1)) {
        cups.push(cups.shift());
    }
}

console.log('final:', cups.join(' '));
const sorted = [...cups.slice(cups.indexOf(1) + 1, cups.length), ...cups.slice(0, cups.indexOf(1))];

console.log('PART 1:', sorted.join(''));