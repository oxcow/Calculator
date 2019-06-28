// https://blog.csdn.net/luoweifu/article/details/10477447

export default class Arithmetic {

    constructor(midExpression) {
        if (typeof midExpression === 'string') {
            this.midExpression = Arithmetic.simpleStringExpressToArray(midExpression);
        } else {
            this.midExpression = midExpression;
        }
        this.postfixExpression = this.getPostfixExpression();
    }

    static isNum(str) {
        return !Arithmetic.OPERATORS.includes(str);
    }

    static comparePriority(operator1, operator2) {

        if (operator1 === '#') return false;

        if (operator1 === ')') return true;

        if (Arithmetic.L1.includes(operator1)) {
            if (Arithmetic.L1.includes(operator2)
                || operator2 === ')') {
                return true;
            }
        }

        if (Arithmetic.L2.includes(operator1)) {
            if (Arithmetic.L2.includes(operator2)
                || Arithmetic.L1.includes(operator2)
                || operator2 === ')') {
                return true;
            }
        }

        return false;
    }

    static simpleStringExpressToArray(stringExpress) {

        let expressionArray = [], nums = [];

        for (let e of Array.from(stringExpress)) {
            if (this.isNum(e)) {
                nums.push(e);
            } else {
                if (nums.length) {
                    expressionArray.push(Number(nums.join('')));
                    nums = [];
                }
                expressionArray.push(e);
            }
        }

        if (nums.length) {
            expressionArray.push(Number(nums.join('')));
        }

        return expressionArray;
    }

    getPostfixExpression() {

        console.info('Mid Expression : ', this.midExpression.join(''));

        let operatorStack = ['#'], postfixExpressions = [];

        for (let midElement of this.midExpression) {

            if (Arithmetic.isNum(midElement)) {
                postfixExpressions.push(midElement);
                continue;
            }

            while (operatorStack.length) {
                const topOperator = operatorStack.pop();
                if (Arithmetic.comparePriority(topOperator, midElement)) {
                    postfixExpressions.push(topOperator);
                } else {
                    if (topOperator !== '(' || midElement !== ')') {
                        operatorStack.push(topOperator);
                        operatorStack.push(midElement);
                    }
                    break;
                }
            }
        }

        while (operatorStack.length) {
            const top = operatorStack.pop();
            if (top !== '#') {
                postfixExpressions.push(top);
            }
        }

        console.info('Postfix Expression : ', postfixExpressions.join(','));

        return postfixExpressions;
    }

    calculate() {

        const clonePostfixExpression = [...this.postfixExpression];

        let len = clonePostfixExpression.length;

        for (let i = 0; i < len; i++) {

            const element = clonePostfixExpression[i];

            if (!Arithmetic.isNum(element)) {

                const param1 = Number(clonePostfixExpression[i - 2]);
                const param2 = Number(clonePostfixExpression[i - 1]);
                let r;

                switch (element) {
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
                clonePostfixExpression.splice(i - 2, 3, r);
                len -= 2;
                i -= 2;
            }
        }
        return clonePostfixExpression[0];
    }
}

Arithmetic.OPERATORS = Array.from('+-*/()');
Arithmetic.L1 = Array.from("+-");
Arithmetic.L2 = Array.from("*/");

// const midExpresses = [
//     '(((((((((8+1)-1)-1)-1)-1)-1)-1)-1)-1)', // 1
//     '(10+(3-1)/2)*-3', // 33
//     '1+3*(0.5-10)/2', // -13.25
//     '1+3*(1-1)/2-2+3*7/3', // 6
//     '(1+((((1*2)/(3+1)+8)/(2-3))/1+3))+2*2'//-0.5
// ];
//
// for (let midExpress of midExpresses) {
//     const arithmetic = new Arithmetic(midExpress);
//     console.log(arithmetic.calculate());
// }