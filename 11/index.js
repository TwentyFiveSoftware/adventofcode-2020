const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');


const grid = lines.map(line => line.split(''));

const flattenGrid = state => state.map(e => e.join('')).join('');

const getResult = simulationMethod => {
    let lastStep = grid;

    while (true) {
        let step = simulationMethod(lastStep);

        if (flattenGrid(step) === flattenGrid(lastStep))
            return flattenGrid(step).split('').filter(c => c === '#').length;

        lastStep = step;
    }
}

// PART 1
const simulatePart1 = state => {
    let newState = [];

    for (let i = 0; i < state.length; i++) {
        newState[i] = [];

        for (let j = 0; j < state[i].length; j++) {
            if (state[i][j] === '.') {
                newState[i][j] = '.';
                continue;
            }

            let occupied = 0;

            if (j > 0 && state[i][j - 1] === '#') occupied++;
            if (j > 0 && i < state.length - 1 && state[i + 1][j - 1] === '#') occupied++;
            if (j > 0 && i > 0 && state[i - 1][j - 1] === '#') occupied++;
            if (i > 0 && state[i - 1][j] === '#') occupied++;
            if (i > 0 && j < state.length - 1 && state[i - 1][j + 1] === '#') occupied++;
            if (j < state.length - 1 && state[i][j + 1] === '#') occupied++;
            if (j < state.length - 1 && i < state.length - 1 && state[i + 1][j + 1] === '#') occupied++;
            if (i < state.length - 1 && state[i + 1][j] === '#') occupied++;


            if (state[i][j] === 'L' && occupied === 0) {
                newState[i][j] = '#';
                continue;
            }

            if (state[i][j] === '#' && occupied >= 4) {
                newState[i][j] = 'L';
                continue;
            }

            newState[i][j] = state[i][j];
        }
    }

    return newState;
}

console.log('PART 1:', getResult(simulatePart1));


// PART 2
const simulatePart2 = state => {
    let newState = [];

    for (let i = 0; i < state.length; i++) {
        newState[i] = [];

        for (let j = 0; j < state[i].length; j++) {
            if (state[i][j] === '.') {
                newState[i][j] = '.';
                continue;
            }

            let occupied = 0;

            // LEFT
            for (let dj = j - 1; dj >= 0; dj--) {
                if (state[i][dj] === '#') occupied++;
                if (state[i][dj] !== '.') break;
            }

            // RIGHT
            for (let dj = j + 1; dj < state.length; dj++) {
                if (state[i][dj] === '#') occupied++;
                if (state[i][dj] !== '.') break;
            }

            // TOP
            for (let di = i - 1; di >= 0; di--) {
                if (state[di][j] === '#') occupied++;
                if (state[di][j] !== '.') break;
            }

            // DOWN
            for (let di = i + 1; di < state.length; di++) {
                if (state[di][j] === '#') occupied++;
                if (state[di][j] !== '.') break;
            }

            // LEFT UP
            for (let delta = 1; ; delta++) {
                if (i - delta < 0 || j - delta < 0) break;
                if (state[i - delta][j - delta] === '#') occupied++;
                if (state[i - delta][j - delta] !== '.') break;
            }

            // LEFT DOWN
            for (let delta = 1; ; delta++) {
                if (i + delta >= state.length || j - delta < 0) break;
                if (state[i + delta][j - delta] === '#') occupied++;
                if (state[i + delta][j - delta] !== '.') break;
            }

            // RIGHT UP
            for (let delta = 1; ; delta++) {
                if (i - delta < 0 || j + delta >= state.length) break;
                if (state[i - delta][j + delta] === '#') occupied++;
                if (state[i - delta][j + delta] !== '.') break;
            }

            // RIGHT DOWN
            for (let delta = 1; ; delta++) {
                if (i + delta >= state.length || j + delta >= state.length) break;
                if (state[i + delta][j + delta] === '#') occupied++;
                if (state[i + delta][j + delta] !== '.') break;
            }

            if (state[i][j] === 'L' && occupied === 0) {
                newState[i][j] = '#';
                continue;
            }

            if (state[i][j] === '#' && occupied >= 5) {
                newState[i][j] = 'L';
                continue;
            }

            newState[i][j] = state[i][j];
        }
    }

    return newState;
}

console.log('PART 2:', getResult(simulatePart2));