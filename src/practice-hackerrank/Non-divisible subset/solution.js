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
    const [, k] = readLine().split(' ').map(x => parseInt(x));
    const s = readLine().split(' ').map(x => parseInt(x));
    const remainderCount = s.reduce((prev, curr) => {
        const r = curr%k;
        prev[r] = prev[r] || 0;
        prev[r]++;
        return prev;
    }, {})
    let count = 0;
    count += Math.min(remainderCount[0] || 0, 1);
    for (let i = 1; i < Math.floor(k / 2) + 1; i++) {
        if (k / 2 == i) {
            count++;
        } else {
            count += (Math.max(remainderCount[i] || 0, remainderCount[k - i] || 0) );
        }
    }
    console.log(count);
}
