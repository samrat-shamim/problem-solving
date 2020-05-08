'use strict';

const fs = require('fs');

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

// Complete the encryption function below.
function encryption(s) {
    let spaceRemoved = s.split(' ').join().split('');
    const length =spaceRemoved.length;
    const sqrtOfLength = Math.sqrt(length);
    let row = Math.floor(sqrtOfLength);
    let column = Math.ceil(sqrtOfLength);
    if (row * column < length){
        row++;
    }
    const subs = [];
    const encryptedSubs = [];
    for(let i = 0; i < row; i++){
        subs.push(spaceRemoved.splice(0, column));
    }
    for(let i = 0; i < column; i++){
        encryptedSubs.push([]);
    }

    for (let i = 0; i < column; i++){
        for (let j = 0; j < row; j++){
            encryptedSubs[i][j] = subs[j][i]
        }
    }

    return encryptedSubs.map(sub => sub.join('')).join(' ');

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
