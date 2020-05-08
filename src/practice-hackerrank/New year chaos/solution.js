'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumBribes function below.
function minimumBribes(queue) {
    var bribes = 0, i, j;
    for (i = 0; i < queue.length; i++) {
        const pos = queue[i], at = i + 1;
        if (pos - at > 2) { console.log('Too chaotic');return "Too chaotic" }
        for (j = Math.max(0, pos - 2); j < i; j++) {
            if (queue[j] > pos) { bribes++ }
        }
    }
    console.log(bribes)
    return bribes;
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q, n);
    }
}
