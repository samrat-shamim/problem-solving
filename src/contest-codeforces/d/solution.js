'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}


function main() {
    const t = parseInt(readLine(), 10);
    for (let i = 0; i < t; i++) {
        const n = parseInt(readLine(), 10);
        const seq = readLine().split(' ').map(x => parseInt(x));
        let moves = 1, a = seq[0], b = 0;
        let li = 1, i = seq.length - 1, ri = i, eatenInPrevMove = a;
        let isAlicesTurn = false;
        while (i >= 1 && li - ri < 1) {
            let eatenTillNow = 0;
            if (isAlicesTurn) {
                while (li - ri < 1) {
                    eatenTillNow += seq[li];
                    li++;
                    if (eatenTillNow>eatenInPrevMove) break;
                }
                a += eatenTillNow;
            } else {
                while (li - ri < 1) {
                    eatenTillNow += seq[ri];
                    ri--;
                    if (eatenTillNow>eatenInPrevMove) break;
                }
                b += eatenTillNow;
            }
            moves++;
            isAlicesTurn = !isAlicesTurn;
            eatenInPrevMove = eatenTillNow;
        }
        console.log([moves, a, b].join(" "));

    }
    return;
}
