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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the buildPalindrome function below.
 */

function buildPalindrome(a, b) {
    let match = a, target = b;
    let validSubs = [{ key: '' }];
    for (let i = 0; i < match.length; i++) {
        const sub = getLongestSub(i, 1);
        sub.length = sub.key.length * 2 + (sub.ext && sub.ext.length || 0);
        if (sub.length > (validSubs[0].length || 0)) {
            validSubs = [sub];
        } else if (sub.length == validSubs[0].length) {
            validSubs.push(sub)
        }
    }
    if (!validSubs[0].key.length) return -1;
    const finalSub = validSubs.sort((x, y) => {
        if (x.length < y.length) return 1;
        else if (x.length > y.length) return -1;
        else if (x.key < y.key) return -1;
        else if (x.key > y.key) return 1;
        else if (x.ext < y.ext) return -1;
        else if (x.ext > y.ext) return 1;
    })[0];
    return finalSub.key + (finalSub.ext || '') + finalSub.key.split('').reverse().join('');

    function getExtension(sub) {
        const m = match.slice(sub.ai + sub.key.length, match.length);
        const n = target.slice(0, sub.bi);

        const palinM = getPalin(m) || match[sub.ai + sub.key.length];
        const palinN = getPalin(n.split('').reverse().join('')) || target[sub.bi - 1];
        if (!palinM || !palinN) {
            return palinM || palinN;
        }
        if (palinM.length > palinN.length) {
            return palinM;
        } else if (palinM.length == palinN.length) {
            const palinNX = palinN.split('').reverse().join('');
            if (palinM > palinNX) {
                return palinNX;
            } else {
                return palinM;
            }
        } else {
            return palinN.split('').reverse().join('');
        }

    }
    function getPalin(str) {
        let palin = '';
        let palLen = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] == str[i + 1]) {
                let r = 1;
                while (str[i - r] && str[i - r] == str[i + 1 + r]) {
                    r++;
                }

                if (i == r - 1) {
                    if (str.slice(0, r * 2).length > palLen) {
                        palin = str.slice(0, r * 2)
                    } else if (str.slice(0, r * 2).length == palLen) {
                        if (str.slice(0, r * 2) < palin) {
                            palin = str.slice(0, r * 2);
                        }
                    }
                }
            }
            if (str[i - 1] == str[i + 1]) {
                let r = 1;
                while (str[i - r] && str[i - r] == str[i + r]) {
                    r++;
                }
                if (i == r - 1) {
                    if (str.slice(0, r * 2).length > palLen) {
                        palin = str.slice(0, r * 2 -1)
                    } else if (str.slice(0, r * 2).length == palLen) {
                        if (str.slice(0, r * 2) < palin) {
                            palin = str.slice(0, r * 2 - 1);
                        }
                    }
                }
            }
        }
        return palin;
    }


    function min(m, n) {
        if (m && n && m < n) {
            return m;
        }
        return n || m;
    }

    function chooseBestOccurrence(occurs, currentSub) {
        const exts = occurs.map(occur => {
            return getExtension({...currentSub, bi:occur})
        })
        const bestExt =  [...exts].sort((x, y) => {
            if (x.length < y.length) return 1;
            else if (x.length > y.length) return -1;
            else if (x < y) return -1;
            else if (x > y) return 1;
        })[0];
        return occurs[exts.indexOf(bestExt)];
    }

    function getLongestSub(i, l, subi) {
        const x = match.slice(i, i + l);
        if ((i + l) <= (match.length)) {
            const occurrences = []
            let z = -1;
            const searchFor = x.split('').reverse().join('');
            while ((z = target.indexOf(searchFor, z+1)) !== -1){
                occurrences.push(z);
            }
            let j;
            if (occurrences.length <= 1){
                j = occurrences[0];
            } else {
                const currSub= {
                    key: match.slice(i, i + l - 1),
                    ai: i,
                    bi: subi
                }
                j = chooseBestOccurrence(occurrences, currSub)
            }
            if (j >= 0) {
                subi = j;
                l++;
                return getLongestSub(i, l, subi);
            } else {
                const sub = {
                    key: match.slice(i, i + l - 1),
                    ai: i,
                    bi: subi
                }
                if (sub.key) {
                    sub.ext = getExtension(sub);
                }

                return sub;
            }
        } else {
            const sub = {
                key: match.slice(i, i + l - 1),
                ai: i,
                bi: subi
            };
            if (sub.key) {
                sub.ext = getExtension(sub);
            }
            return sub;
        }

    }
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine();

        const b = readLine();

        let result = buildPalindrome(a, b);

        ws.write(result + "\n");
    }

    ws.end();
}
