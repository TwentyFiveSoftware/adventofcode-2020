const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n').map(line => line.replace(/ /g, ''));


// PART 1
const part1 = () => {
    const evaluateLine = line => {
        let currentChar = 0;

        const nextChar = () => {
            const char = line.charAt(currentChar);
            currentChar++;
            return char;
        }

        const consumeIfMatch = match => {
            const char = line.charAt(currentChar);

            if (char === match) {
                currentChar++;
                return true;
            }

            return false;
        }

        const parseExpression = () => {
            let x = parseFactor();

            while (true)
                if (consumeIfMatch('+'))
                    x += parseFactor();
                else if (consumeIfMatch('*'))
                    x *= parseFactor();
                else return x;
        }

        const parseFactor = () => {
            let factor;

            if (consumeIfMatch('(')) {
                factor = parseExpression();
                consumeIfMatch(')');

            } else {
                factor = Number(nextChar());
            }

            return factor;
        }

        return parseExpression();
    }

    return lines.reduce((prev, curr) => prev + evaluateLine(curr), 0);
}

console.log('PART 1:', part1());


// PART 2
const part2 = () => {
    const evaluateLine = line => {
        let currentChar = 0;

        const nextChar = () => {
            const char = line.charAt(currentChar);
            currentChar++;
            return char;
        }

        const consumeIfMatch = match => {
            const char = line.charAt(currentChar);

            if (char === match) {
                currentChar++;
                return true;
            }

            return false;
        }

        const parseExpression = () => {
            let x = parseTerm();

            while (true)
                if (consumeIfMatch('*'))
                    x *= parseTerm();
                else return x;
        }

        const parseTerm = () => {
            let x = parseFactor();

            while (true)
                if (consumeIfMatch('+'))
                    x += parseFactor();
                else return x;
        }

        const parseFactor = () => {
            let factor;

            if (consumeIfMatch('(')) {
                factor = parseExpression();
                consumeIfMatch(')');

            } else {
                factor = Number(nextChar());
            }

            return factor;
        }

        return parseExpression();
    }

    return lines.reduce((prev, curr) => prev + evaluateLine(curr), 0);
}

console.log('PART 2:', part2());