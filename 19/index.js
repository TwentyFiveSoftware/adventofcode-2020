const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const ruleLines = lines.slice(0, lines.indexOf(''));
const sampleLines = lines.slice(lines.indexOf('') + 1);

const rules = new Map();

for (const r of ruleLines) {
    const split = r.split(': ');

    if (split[1].indexOf('"') !== -1)
        rules.set(split[0], {value: split[1].replace(/"/g, ''), final: true});
    else
        rules.set(split[0], {value: split[1].split(' | '), final: false});
}


// PART 1
const part1 = () => {
    const buildRegex = (ruleNumber = '0') => {
        const rule = rules.get(ruleNumber);

        if (rule.final)
            return rule.value;

        return '(' + rule.value.map(option => option.split(' ').map(r => buildRegex(r)).join('')).join('|') + ')';
    }

    const regex = new RegExp(`^${buildRegex()}$`);
    return sampleLines.map(line => line.match(regex)).filter(match => match).length;
}

console.log('PART 1:', part1());


// PART 2
const part2 = () => {
    const buildRegex = (ruleNumber = '0') => {
        const rule = rules.get(ruleNumber);

        if (rule.final)
            return rule.value;

        if (ruleNumber === '8')
            return `(?:${buildRegex('42')})+`;

        if (ruleNumber === '11') {
            const tmp = [];

            const regex42 = buildRegex('42');
            const regex31 = buildRegex('31');

            for (let i = 1; i < 5; i++)
                tmp.push(`(?:(?:${regex42}){${i}}(?:${regex31}){${i}})`);

            return `(?:${tmp.join('|')})`;
        }

        return '(?:' + rule.value.map(option => option.split(' ').map(r => buildRegex(r)).join('')).join('|') + ')';
    }

    const regex = new RegExp(`^${buildRegex()}$`);
    return sampleLines.map(line => line.match(regex)).filter(match => match).length;
}

console.log('PART 2:', part2());