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

// Complete the organizingContainers function below.
function organizingContainers(containers){
    let n = containers.length;
    let a = [];
    let b = [];
    for(let i=0; i<n; i++)
    {
        for(let j=0; j<n; j++)
        {
            let x = containers[i][j];
            a[i] = x + (a[i] || 0);
            b[j] = x + (b[j] || 0);
        }
    }
    let result = "Possible";
    for(let i=0;i<n;i++)
    {
        let j=0;
        for(j=i;j<n;j++)
        {
            if(a[i] == b[j])
            {
                let temp = b[j];
                b[j] = b[i];
                b[i] = temp;
                break;
            }
        }
        if(j==n)
        {
            result = "Impossible";
            break;
        }
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);

        let container = Array(n);

        for (let i = 0; i < n; i++) {
            container[i] = readLine().split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        let result = organizingContainers(container);

        ws.write(result + "\n");
    }

    ws.end();
}
