const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const numbers = lines.map(Number);
numbers.sort((a, b) => a - b);


// PART 1
const result = numbers.reduce((prev, current, index, arr) => {
    let {oneJoltDifferences, threeJoltDifferences} = prev;
    const previousAdapter = arr[index - 1] ?? 0;

    if (current - previousAdapter === 1)
        oneJoltDifferences++;

    else if (current - previousAdapter === 3)
        threeJoltDifferences++;

    return {oneJoltDifferences, threeJoltDifferences};
}, {oneJoltDifferences: 0, threeJoltDifferences: 1})

console.log('PART 1:', result.oneJoltDifferences * result.threeJoltDifferences);


// PART 2
const checkIfArrangementIsValid = arrangement => [...arrangement, Math.max(...numbers) + 3].filter((e, i, arr) => e - (arr[i - 1] || 0) > 3).length === 0;

const getArrangements = (availableAdapters = numbers, startIndex = 0) => {
    if (!checkIfArrangementIsValid(availableAdapters))
        return 0;

    let count = 1;

    for (let indexToLeaveOut = startIndex; indexToLeaveOut < availableAdapters.length; indexToLeaveOut++) {
        let newAvailableAdapters = [...availableAdapters];
        newAvailableAdapters.splice(indexToLeaveOut, 1);

        count += getArrangements(newAvailableAdapters, indexToLeaveOut);
    }

    return count;
}

console.log('PART 2:', getArrangements());
