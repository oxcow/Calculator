// https://blog.csdn.net/luoweifu/article/details/10477447

const midExpress = 'A+(B-C)/D)*E';

const operators = Array.from('+-*/()');

const L1 = Array.from("+-");
const L2 = Array.from("*/");
const L3 = Array.from("()");

function isNum(str) {
    return !operators.includes(str);
}

function isGt(x, y) {
    if (x === '#'){
        console.log('x is #');
        return false;
    }
    if (y === '#') {
        console.log('y is #')
        return true;
    }

    if (L1.includes(x)) {

        if (L1.includes(y)) {
            return true;
        }

        if (L3.includes(y) && y === ')') {
            return true;
        }
    }

    if (L2.includes(x)) {
        if (L2.includes(y)) {
            return true;
        }

        if (L3.includes(y) && y === ')') {
            return true;
        }
    }

    if (L3.includes(x) && x === ')') {
        return true;
    }

    return false;
}

function TCalculotor(midExpress) {
    console.log('input: ', midExpress);


    let S = ['#'];
    let L = [];

    const targetExpress = Array.from(midExpress);

    for (let v of targetExpress) {
        if (isNum(v)) {
            L.push(v);
            continue;
        }
        while (S.length) {
            console.log(S, " >><< ", L);
            let x1 = S.pop();
            let x2 = v;

            if (isGt(x1, x2)) {
                L.push(x1);
            } else {
                if (x1 === '(' && x2 === ')') {
                    break;
                } else {
                    S.push(x1);
                    S.push(x2);
                }
                break;
            }
        }
    }

    while (S.length) {
        const s = S.pop();
        if (s !== '#') {
            L.push(s);
        }

        console.log('output: ', L);
    }
}

TCalculotor(midExpress);

