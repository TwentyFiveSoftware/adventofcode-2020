const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const mapping = lines.map(line => ({action: line.substr(0, 1), value: Number(line.substring(1))}))


// PART 1
const resultPart1 = mapping.reduce((prev, {action, value}) => {
    if (action === 'N')
        prev.north += value;
    else if (action === 'S')
        prev.north -= value;
    else if (action === 'E')
        prev.east += value;
    else if (action === 'W')
        prev.east -= value;
    else if (action === 'L') {
        prev.rotation -= value;
        if (prev.rotation < 0)
            prev.rotation = 360 + prev.rotation;
    } else if (action === 'R') {
        prev.rotation += value;
        prev.rotation %= 360;
    } else if (action === 'F') {
        if (prev.rotation === 0)
            prev.north += value;
        else if (prev.rotation === 90)
            prev.east += value;
        else if (prev.rotation === 180)
            prev.north -= value;
        else if (prev.rotation === 270)
            prev.east -= value;
    }

    return prev;
}, {north: 0, east: 0, rotation: 90});

console.log('PART 1:', Math.abs(resultPart1.north) + Math.abs(resultPart1.east))


// PART 2
const resultPart2 = mapping.reduce((prev, {action, value}) => {
    if (action === 'N')
        prev.waypointNorth += value;
    else if (action === 'S')
        prev.waypointNorth -= value;
    else if (action === 'E')
        prev.waypointEast += value;
    else if (action === 'W')
        prev.waypointEast -= value;
    else if (action === 'L') {
        for (let i = 0; i < value / 90; i++) {
            let currentNorth = prev.waypointNorth;
            prev.waypointNorth = prev.waypointEast;
            prev.waypointEast = -currentNorth;
        }

    } else if (action === 'R') {
        for (let i = 0; i < value / 90; i++) {
            let currentNorth = prev.waypointNorth;
            prev.waypointNorth = -prev.waypointEast;
            prev.waypointEast = currentNorth;
        }

    } else if (action === 'F') {
        prev.north += value * prev.waypointNorth;
        prev.east += value * prev.waypointEast;
    }

    return prev;
}, {north: 0, east: 0, waypointNorth: 1, waypointEast: 10});


console.log('PART 2:', Math.abs(resultPart2.north) + Math.abs(resultPart2.east))