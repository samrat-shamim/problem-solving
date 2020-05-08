'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the matrixRotation function below.
function matrixRotation(matrix, r) {
    let output = [];
    const x = matrix[0].length - 1;
    const y = matrix.length - 1;
    for (let i = 0; i <=y; i++){
        output.push([]);
    }
    const totalPath = Math.ceil(Math.min(x, y) / 2);
    const paths = [];
    for (let i = 0; i < totalPath; i++) {
        const path = [];
        const turningPoints = [[i, i], [y - i, i], [y - i, x - i], [i, x - i]];
        for (let j = 0; j < 4; j++) {
            const tpoint = turningPoints[j];
            const nextTpoint = turningPoints[(j + 1) == 4 ? 0 : j + 1];
            if (tpoint[0] == nextTpoint[0]) {
                if (tpoint[1] < nextTpoint[1]) {
                    for (let ay = tpoint[1]; ay < nextTpoint[1]; ay++) {
                        path.push([tpoint[0], ay]);
                    }
                } else if (tpoint[1] > nextTpoint[1]) {
                    for (let ay = tpoint[1]; ay > nextTpoint[1]; ay--) {
                        path.push([tpoint[0], ay]);
                    }
                } else {
                    path.push(tpoint)
                }
            } else if (tpoint[1] == nextTpoint[1]) {
                if (tpoint[0] < nextTpoint[0]) {
                    for (let ay = tpoint[0]; ay < nextTpoint[0]; ay++) {
                        path.push([ay, tpoint[1]]);
                    }
                } else if (tpoint[0] > nextTpoint[0]) {
                    for (let ay = tpoint[0]; ay > nextTpoint[0]; ay--) {
                        path.push([ay, tpoint[1]]);
                    }
                } else {
                    path.push(tpoint)
                }
            }
        }
        paths.push(path);
    }

    const finalPaths = paths.map(path => {
        const pathCopy = [...path.reverse()];
        const a = pathCopy.splice(0, r%pathCopy.length);
        return [...pathCopy, ...a];
    })
    paths.forEach((path, i)=> {
        path.forEach((point, j) => {
            const finalPoint =finalPaths[i][j];
            output[point[0]][point[1]] = matrix[finalPoint[0]][finalPoint[1]];
        })
    })

    console.log(output.map(arr => arr.join(' ')).join('\n'));
}

function main() {
    const mnr = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(mnr[0], 10);

    const n = parseInt(mnr[1], 10);

    const r = parseInt(mnr[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}
