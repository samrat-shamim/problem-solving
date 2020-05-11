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
    for (let i = 0; i< t;i++){
        let [n,k] = readLine().split(' ').map(x=>parseInt(x));
        let f = getValidTerms(1, k, n);
        console.log(f);

    }

    function getValidTerms(a, n, div) {
        let f = a + n - 1;
        let s = Math.floor(((f - f%div) -(a%div == 0?a:a + (div - a%div)))/div) + 1;
        if (f-a<div){
            let a1 = a + div - a%n;
            if (a1<=f) return ++f;
        }
        if (s <= 0){
            return f;
        } else {
            return getValidTerms(f+1, s, div);
        }
    }
}
