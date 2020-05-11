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
    readLine()
    const currentState = readLine().split(' ').map(x => parseInt(x));
    readLine();
    const scores = readLine().split(' ').map(x => parseInt(x));
    const state = currentState.filter((item, i) => {
        if (item == currentState[i - 1]) return false;
        return true;
    })
    let j = state.length - 1;
    scores.forEach(score => {
        while (state[j] < score) {
            j--;
        }
        //console.log(score, state[j-1], state[j], state[j+1])
        if (score == state[j]) {
            console.log(j + 1)
        } else if (score < state[j] && score > state[j + 1])
            console.log((j + 2))
            else if (score<state[j-1] && score>state[j])
                console.log(j+1)
        else
            console.log(j + 2);

    })
    return;
}


/*function main() {
    readLine()
    let time = Date.now();
    const currentState = readLine().split(' ').map(x => parseInt(x));
    console.log("to split state: " + (Date.now() - time));
    readLine();
    time = Date.now();
    const scores = readLine().split(' ').map(x => parseInt(x));
    console.log("to split scores: " + (Date.now() - time));
    time = Date.now();
    const state = currentState.filter((item, i) => {
        if (item == currentState[i - 1]) return false;
        return true;
    })
    console.log("to filter state: " + (Date.now() - time));
    scores.forEach(score => {
        time = Date.now();
        let pos = binarySearch([...state], score);
        if (pos == -1) {
            pos = state.length;
        }
        console.log("to get pos: " + (Date.now() - time));
        //console.log(++pos)
    })
    return;
}*/

function binarySearch(arr, i, currentPos = 0) {
    var mid = Math.floor(arr.length / 2);
    if (arr[mid] === i) {
        return currentPos + mid;
    } else if (arr[mid] > i && arr.length > 1 && arr[mid + 1] < i) return currentPos + mid + 1;
    else if (arr[mid - 1] > i && arr.length > 1 && arr[mid] < i) return currentPos + mid;
    else if (arr[mid] > i && arr.length > 1) {
        return binarySearch(arr.splice(mid, Number.MAX_VALUE), i, currentPos + mid);
    } else if (arr[mid] < i && arr.length > 1) {
        return binarySearch(arr.splice(0, mid), i, currentPos);
    } else {
        if (arr[0] < i) return 0;
        return -1
    }
}
