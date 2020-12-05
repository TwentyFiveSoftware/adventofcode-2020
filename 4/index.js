const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

let lines = file.split('\n\n');
lines = lines.map(l => l.replace(/\n/g, ' '));


// PART 1
const resultPart1 = lines.reduce((count, line) => {
    const fields = line.split(' ').map(s => s.split(':')[0]);

    const hasCID = fields.indexOf('cid') >= 0;
    const isValid = (fields.length === 8 && hasCID) || (fields.length === 7 && !hasCID);

    return count + (isValid ? 1 : 0);
}, 0);

console.log('PART 1:', resultPart1);


// PART 2
const resultPart2 = lines.reduce((count, line) => {
    const fields = {};

    for (let s of line.split(' '))
        fields[s.split(':')[0]] = s.split(':')[1];

    // byr
    if (!(Number(fields['byr']) >= 1920 && Number(fields['byr']) <= 2002))
        return count;

    // iyr
    if (!(Number(fields['iyr']) >= 2010 && Number(fields['iyr']) <= 2020))
        return count;

    // eyr
    if (!(Number(fields['eyr']) >= 2020 && Number(fields['eyr']) <= 2030))
        return count;

    // hgt
    const hgt = fields['hgt'] ?? '';
    if (!hgt.match(/^[0-9]+(cm|in)$/))
        return count;

    const height = Number(hgt.substring(0, hgt.length - 2));

    if (hgt.endsWith('cm'))
        if (!(height >= 150 && height <= 193))
            return count;

    if (hgt.endsWith('in'))
        if (!(height >= 59 && height <= 76))
            return count;

    // hcl
    if (!(fields['hcl'] || '').match(/^#([0-9]|[a-f]){6}$/))
        return count;

    // ecl
    if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(fields['ecl']) === -1)
        return count;

    // pid
    if (!(fields['pid'] || '').match(/^[0-9]{9}$/))
        return count;

    return count + 1;
}, 0);

console.log('PART 2:', resultPart2);