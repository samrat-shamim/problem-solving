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

function getTotalValueOfK(k) {
    let total = 0;
    for (let i = 0; i<k; i++){
        total += Math.pow(2,i);
    }
    return total
}


function main() {
    const n = parseInt(readLine(), 10);
    for (let i = 0; i<n; i++){
        const m = parseInt(readLine(), 10);
        let k = 1;
        while (m%getTotalValueOfK(k) != 0){
            console.log(k);
            k++
        };
        console.log(m/getTotalValueOfK(k))
    }
    return;
}
