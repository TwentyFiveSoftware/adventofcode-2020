const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const instructions = lines.map(line => ({operation: line.split(' ')[0], argument: Number(line.split(' ')[1])}))

const runInstructions = instructions => {
    let accumulator = 0;
    let currentIndex = 0;
    let executedIndices = [];
    let isInfiniteLoop = false;

    while (true) {
        if (executedIndices.indexOf(currentIndex) !== -1) {
            isInfiniteLoop = true;
            break;
        }

        if (currentIndex >= instructions.length)
            break;

        const {operation, argument} = instructions[currentIndex];

        executedIndices.push(currentIndex);

        switch (operation) {
            case 'nop':
                currentIndex++;
                break;

            case 'acc':
                accumulator += argument;
                currentIndex++;
                break;

            case 'jmp':
                currentIndex += argument;
                break;
        }
    }

    return {isInfiniteLoop, accumulator};
}


// PART 1
console.log('PART 1:', runInstructions(instructions).accumulator);


// PART 2
for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].operation === 'jmp') {
        const instructionsCopy = JSON.parse(JSON.stringify(instructions));
        instructionsCopy[i].operation = 'nop';

        const {isInfiniteLoop, accumulator} = runInstructions(instructionsCopy);
        if (!isInfiniteLoop) {
            console.log('PART 2:', accumulator, `(switched jmp on line ${i + 1} to nop)`);
            break;
        }

    } else if (instructions[i].operation === 'nop') {
        const instructionsCopy = JSON.parse(JSON.stringify(instructions));
        instructionsCopy[i].operation = 'jmp';

        const {isInfiniteLoop, accumulator} = runInstructions(instructionsCopy);
        if (!isInfiniteLoop) {
            console.log('PART 2:', accumulator, `(switched nop on line ${i + 1} to jmp)`);
            break;
        }
    }
}
