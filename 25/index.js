const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const keys = file.split('\n').map(Number);

const MAX_LOOP_SIZE = 10000000;

const getLoopSize = key => {
    let currValue = 7;

    for (let i = 1; i <= MAX_LOOP_SIZE; i++) {
        currValue *= 7;
        currValue %= 20201227;

        if (currValue === key)
            return i;
    }

    return -1;
}

const getEncryptionKey = (key, loopSize) => {
    let value = key;

    for (let i = 0; i < loopSize; i++) {
        value *= key;
        value %= 20201227;
    }

    return value;
}

const encryptionKey = getEncryptionKey(keys[1], getLoopSize(keys[0]));
console.log('PART 1:', encryptionKey);