// https://blog.csdn.net/luoweifu/article/details/10477447

const operators = Array.from('+-*/()');

const L1 = Array.from("+-");
const L2 = Array.from("*/");
const L3 = Array.from("()");

function isNum(str) {
    return !operators.includes(str);
}

function isGt(x, y) {
    if (x === '#') {
        //console.log('x is #');
        return false;
    }

    if (x === ')') {
        return true;
    }

    if (L1.includes(x)) {
        if (L1.includes(y)) {
            return true;
        }
        if (y === ')') {
            return true;
        }
    }

    if (L2.includes(x)) {
        if (L2.includes(y) || L1.includes(y)) {
            return true;
        }
        if (y === ')') {
            return true;
        }
    }

    return false;
}


function stringExpressToArray(stringExpress) {

    let k = [];

    let t = [];

    for (let e of Array.from(stringExpress)) {
        if (isNum(e)) {
            t.push(e);
        } else {
            if (t.length) {
                k.push(Number(t.join('')));
                t = [];
            }
            k.push(e);
        }
    }

    if (t.length) {
        k.push(Number(t.join('')));
    }
    // console.log(k)
    return k;
}

function TCalculotor(midExpress) {
    console.log('infix: ', midExpress);


    let S = ['#'];
    let L = [];

    const targetExpress = stringExpressToArray(midExpress);

    for (let v of targetExpress) {
        if (isNum(v)) {
            L.push(v);
            continue;
        }
        while (S.length) {
            //console.log(S, " >><< ", L);
            let x1 = S.pop();
            let x2 = v;

            //console.log(x1, ', ', x2, ' isGt ', isGt(x1, x2));
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

        // console.log('output: ', L);
    }

    return L;
}

function cal(postfixExpression) {

    const copyExpression = [...postfixExpression];

    let len = copyExpression.length;

    for (let i = 0; i < len; i++) {

        const elment = copyExpression[i];

        if (!isNum(elment)) {

            const param1 = Number(copyExpression[i - 2]);
            const param2 = Number(copyExpression[i - 1]);
            let r;
            switch (elment) {
                case '+':
                    r = param1 + param2;
                    break;
                case '-':
                    r = param1 - param2;
                    break;
                case '*':
                    r = param1 * param2;
                    break;
                case '/':
                    r = param1 / param2;
                    break;
                default:
            }
            copyExpression.splice(i - 2, 3, r);
            len -= 2;
            i -= 2;
        }
    }
    return copyExpression[0];
}

const midExpresses = [
    '(((((((((8+1)-1)-1)-1)-1)-1)-1)-1)-1)', // 1
    '(10+(3-1)/2)*3', // 33
    '1+3*(0.5-10)/2', // -13.25
    '1+3*(1-1)/2-2+3*7/3', // 6
    '(1+((((1*2)/(3+1)+8)/(2-3))/1+3))+2*2'//-0.5
];

for (let midExpress of midExpresses) {
    const postfixExpression = TCalculotor(midExpress);
    console.log('postfix: ', postfixExpression);
    console.log('result: ', cal(postfixExpression));
}







