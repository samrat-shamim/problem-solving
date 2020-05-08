'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumSwaps function below.
function minimumSwaps(input) {
    let totalSwaps = 0;
    const posToBeReviewed = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] == i + 1) {
            continue;
        } else {
            swapWith(i, input[i] - 1)
        }
    }
    while (posToBeReviewed.length) {
        if (input[posToBeReviewed[0]] == posToBeReviewed[0] + 1) {
            posToBeReviewed.splice(0, 1);
        } else {
            swapWith(posToBeReviewed[0], input[posToBeReviewed[0]] - 1);
        }
    }

    function swapWith(swap, _with) {
        debugger
        const temp = input[_with];
        input[_with] = input[swap];
        input[swap] = temp;
        totalSwaps++;
        posToBeReviewed.push(swap);
    }

    return totalSwaps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
