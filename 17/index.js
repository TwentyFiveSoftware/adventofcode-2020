const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

const simulationSpaceSize = 6 + lines.length;

// PART 1
const part1 = () => {
    let cubes = new Map();

    for (let y = 0; y < lines.length; y++)
        for (let x = 0; x < lines[y].length; x++)
            cubes.set([x, y, 0].join(','), lines[x][y] === '#');


    for (let cycle = 0; cycle < 6; cycle++) {
        let newCubeStates = new Map();

        for (let x = -simulationSpaceSize; x < simulationSpaceSize; x++)
            for (let y = -simulationSpaceSize; y < simulationSpaceSize; y++)
                for (let z = -simulationSpaceSize; z < simulationSpaceSize; z++) {
                    let activeNeighbors = 0;

                    for (let dx = -1; dx <= 1; dx++)
                        for (let dy = -1; dy <= 1; dy++)
                            for (let dz = -1; dz <= 1; dz++)
                                if (dx !== 0 || dy !== 0 || dz !== 0)
                                    if (cubes.get([x + dx, y + dy, z + dz].join(',')))
                                        activeNeighbors++;


                    let state = cubes.get([x, y, z].join(','));

                    if (state)
                        newCubeStates.set([x, y, z].join(','), activeNeighbors === 2 || activeNeighbors === 3);
                    else
                        newCubeStates.set([x, y, z].join(','), activeNeighbors === 3);
                }

        cubes = newCubeStates;
    }

    return [...cubes.values()].filter(state => state).length;
}

console.log('PART 1:', part1());


// PART 2
const part2 = () => {
    let cubes = new Map();

    for (let y = 0; y < lines.length; y++)
        for (let x = 0; x < lines[y].length; x++)
            cubes.set([x, y, 0, 0].join(','), lines[x][y] === '#');


    for (let cycle = 0; cycle < 6; cycle++) {
        let newCubeStates = new Map();

        for (let x = -simulationSpaceSize; x < simulationSpaceSize; x++)
            for (let y = -simulationSpaceSize; y < simulationSpaceSize; y++)
                for (let z = -simulationSpaceSize; z < simulationSpaceSize; z++)
                    for (let w = -simulationSpaceSize; w < simulationSpaceSize; w++) {
                        let activeNeighbors = 0;

                        for (let dx = -1; dx <= 1; dx++)
                            for (let dy = -1; dy <= 1; dy++)
                                for (let dz = -1; dz <= 1; dz++)
                                    for (let dw = -1; dw <= 1; dw++)
                                        if (dx !== 0 || dy !== 0 || dz !== 0 || dw !== 0)
                                            if (cubes.get([x + dx, y + dy, z + dz, w + dw].join(',')))
                                                activeNeighbors++;


                        let state = cubes.get([x, y, z, w].join(','));

                        if (state)
                            newCubeStates.set([x, y, z, w].join(','), activeNeighbors === 2 || activeNeighbors === 3);
                        else
                            newCubeStates.set([x, y, z, w].join(','), activeNeighbors === 3);
                    }

        cubes = newCubeStates;
    }

    return [...cubes.values()].filter(state => state).length;
}

console.log('PART 2:', part2());