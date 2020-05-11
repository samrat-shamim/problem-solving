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
    for (let j = 0;j<t;j++){
        let [n,k] = readLine().split(' ').map(x=>parseInt(x));
        if (k % 2 == 0 && n % 2 != 0) {
            console.log('NO')
            continue;
        }

        let solution = [];
        let odd = k % 2 == 0 || n % 2 != 0;
        let sum = 0;

        for (let i = 0; i<k  - 1; i++) {
            solution.push(odd ? 1 : 2);
            sum += solution[i];
        }

        if (n <= sum) {
            console.log("NO")
            continue;
        }

        solution.push(n - sum);
        console.log("YES")
        console.log(solution.join(" "))
    }

}
