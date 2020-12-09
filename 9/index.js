const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const numbers = lines.map(Number);

const previousNumbers = 25;

const findInvalidNumber = () => {
    for (let i = previousNumbers; i < numbers.length; i++) {
        let number = numbers[i];
        let valid = false;

        for (let j = i - previousNumbers; j < i; j++) {
            for (let k = i - previousNumbers; k < i; k++) {
                if (j === k)
                    continue;

                if (numbers[j] + numbers[k] === number) {
                    valid = true;
                    break;
                }
            }

            if (valid)
                break;
        }

        if (!valid)
            return number;
    }

    return null;
}

const invalidNumber = findInvalidNumber();


// PART 1
console.log('PART 1:', invalidNumber);


// PART 2
for (let i = 0; i < numbers.length; i++) {
    let sum = 0;
    let maxIndex = 0;

    for (let k = i; k < numbers.length; k++) {
        sum += numbers[k];
        maxIndex = k;

        if (sum >= invalidNumber)
            break;
    }

    if (sum === invalidNumber) {
        const min = Math.min(...numbers.slice(i, maxIndex + 1));
        const max = Math.max(...numbers.slice(i, maxIndex + 1));

        console.log('PART 2:', min + max);

        break;
    }
}