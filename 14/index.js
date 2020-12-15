const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const instructions = lines.map(line => {
    if (line.startsWith('mask'))
        return {operation: 'mask', value: line.replace('mask = ', '')};

    return {operation: 'mem', address: line.match(/[0-9]+/)[0], value: Number(line.match(/[0-9]+$/)[0])};
});

// PART 1
const part1 = () => {
    const memory = {};
    let mask = [];

    for (const {operation, value, address} of instructions) {
        if (operation === 'mask') {
            mask = value.split('').reverse();
            continue;
        }

        const reversedValue = value.toString(2).split('').reverse();
        const maskedValue = mask.map((v, i) => mask[i] === 'X' ? (reversedValue[i] || '0') : mask[i]).reverse().join('');

        memory[address] = Number.parseInt(maskedValue, 2);
    }

    return Object.values(memory).reduce((sum, curr) => sum + curr, 0);
}

console.log('PART 1:', part1());


// PART 2
const part2 = () => {
    const memory = {};
    let mask = [];

    for (const {operation, value, address} of instructions) {
        if (operation === 'mask') {
            mask = value.split('').reverse();
            continue;
        }

        const reversedAddress = Number(address).toString(2).split('').reverse();
        const maskedAddress = mask.map((v, i) => mask[i] === '0' ? (reversedAddress[i] || '0') : mask[i]).reverse().join('');

        for (const a of getAllAddresses(maskedAddress))
            memory[Number.parseInt(a, 2)] = value;
    }

    return Object.values(memory).reduce((sum, curr) => sum + curr, 0);
}

const getAllAddresses = (floatingAddress, current = '') => {
    let addresses = [current + floatingAddress.substring(current.length)];

    for (let i = current.length; i < floatingAddress.length; i++) {
        if (floatingAddress[i] !== 'X') continue;

        addresses = [
            ...getAllAddresses(floatingAddress, current + floatingAddress.substring(current.length, i) + '0'),
            ...getAllAddresses(floatingAddress, current + floatingAddress.substring(current.length, i) + '1')
        ];
        break;
    }

    return addresses;
}

console.log('PART 2:', part2());