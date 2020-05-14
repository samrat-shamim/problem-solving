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
    const [h, w] = readLine().split(' ').map(x=>parseInt(x));
    const matrix = [];
    for (let i = 1; i < h+1; i++) {
        matrix[i] = [0, ...readLine().split(' ').map(x => parseInt(x)), 0];
    }
    const dummy = [];
    for (let i =0; i< w+2;i++){
        dummy.push(0);
    }
    matrix[0] = dummy;
    matrix[h+1] = dummy;
    let area = 2*h*w;
    for (let i=1; i<=h;i++){
        for (let j = 1; j<=w; j++){
            area += Math.max(0, matrix[i][j]-matrix[i-1][j]);
            area += Math.max(0, matrix[i][j]-matrix[i+1][j]);
            area += Math.max(0, matrix[i][j]-matrix[i][j-1]);
            area += Math.max(0, matrix[i][j]-matrix[i][j+1]);
        }
    }
    console.log(area);
}

