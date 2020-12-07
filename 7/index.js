const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

// PART 1
let mapped = lines.map(line => line.replace('.', '').replace(/bags?/g, ''));
mapped = mapped.filter(line => line.indexOf('no') === -1);
mapped = mapped.map(line => line.split('contain'));
const rules = mapped.map(line => ({outside: line[0].trim(), inside: line[1]}));

const getContainerColorsOfBag = bag => {
    const outsideRules = rules.filter(r => r.inside.indexOf(bag) !== -1);

    if (outsideRules.length === 0)
        return [bag];

    const containerColors = [];

    for (const {outside} of outsideRules)
        containerColors.push(outside, ...getContainerColorsOfBag(outside));

    return containerColors;
}

const uniqueContainerColors = new Set(getContainerColorsOfBag('shiny gold'));

console.log('PART 1:', uniqueContainerColors.size)


// PART 2
const requirements = {};

for (const line of lines) {
    let [key, value] = line.split(' bags contain ');

    if (value === 'no other bags.') {
        requirements[key] = [];
        continue;
    }

    value = value.replace(/bags?/g, '').replace(/\./g, '');

    requirements[key] = value.split(',').map(bag => ({quantity: Number(bag.trim().charAt(0)), color: bag.trim().substr(1).trim()}));
}

const calculateRequiredBags = bag => {
    const requiredBags = requirements[bag];

    if (requiredBags.length === 0)
        return 1;

    let count = 1;

    for (const {color, quantity} of requiredBags)
        count += quantity * calculateRequiredBags(color);

    return count;
}

console.log('PART 2:', calculateRequiredBags('shiny gold') - 1);