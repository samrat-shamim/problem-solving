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
    const n = parseInt(readLine(), 10);
    for(let i =0; i<n; i++){
        let target =  parseInt(readLine(), 10);;
        const nums = [];
        let j = 0;
        while (target>0){
            let s =  Math.pow(10,(target + '').length - 1 ) * parseInt((target + '')[0]);
            target -= s;
            j++;
            nums.push(s);
        }
        console.log(j)
        console.log(nums.join(' '))
    }
    return;
}
