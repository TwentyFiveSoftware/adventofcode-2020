const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const directions = {
    se: {x: 0.5, y: -1},
    sw: {x: -0.5, y: -1},
    ne: {x: 0.5, y: 1},
    nw: {x: -0.5, y: 1},
    e: {x: 1, y: 0},
    w: {x: -1, y: 0},
};

const tiles = lines.map(line => {
    let pos = {x: 0, y: 0};

    for (let i = 0; i < line.length; i++) {
        const curr = line.substr(i);
        const match = curr.match(/(se)|(sw)|(ne)|(nw)/);

        let d = {x: 0, y: 0};

        if (match && match.index === 0) {
            d = directions[match[0]];
            i++;
        } else
            d = directions[curr[0]];

        pos.x += d.x;
        pos.y += d.y;
    }

    return pos;
});


let tileMap = new Map();

for (const tile of tiles) {
    const key = tile.x + ';' + tile.y;

    if (tileMap.has(key))
        tileMap.set(key, !tileMap.get(key))
    else
        tileMap.set(key, true);
}

// PART 1
let flippedTiles = [...tileMap.values()].filter(t => t).length;
console.log('PART 1:', flippedTiles);


// PART 2
const area = 100;

for (let day = 1; day <= 100; day++) {
    const newTileMap = new Map();

    for (let x = -area; x <= area; x += 0.5)
        for (let y = -area; y <= area; y += 0.5) {
            const key = x + ';' + y;
            const isFlipped = tileMap.get(key) ?? false;

            const adjacentTileStates = Object.values(directions).map(d => tileMap.get((x + d.x) + ';' + (y + d.y)) ?? false);
            const adjacentTilesFlipped = adjacentTileStates.filter(t => t).length;

            if (isFlipped && (adjacentTilesFlipped === 0 || adjacentTilesFlipped > 2))
                newTileMap.set(key, false);
            else if (!isFlipped && adjacentTilesFlipped === 2)
                newTileMap.set(key, true);
            else
                newTileMap.set(key, isFlipped);
        }

    tileMap = newTileMap;
}

flippedTiles = [...tileMap.values()].filter(t => t).length;
console.log('PART 2:', flippedTiles);