;

const getNumberFromArray = Symbol('getNumberFromArray');
const getArrayFromNumber = Symbol('getArrayFromNumber')

export default class Calculator {

    constructor() {
        this.param1 = [0];
        this.param2 = [];
        this.operator = null
    }

    [getNumberFromArray](array) {
        return Number(array.join(''));
    }

    [getArrayFromNumber](number) {
        return [...String(number)];
    }

    setParam1 = (val) => {
        this.param1.push(val);
    }

    setParam2 = (val) => {
        if (this.param2.length === 0) {
            this.param2.push(0);
        }
        this.param2.push(val);
    }

    setOperator = (operator) => {
        if (this.operator != null) {
            this.calculate();
        }
        this.operator = operator;
    }

    getParam1Value = () => {
        return this[getNumberFromArray](this.param1);
    }

    getParam2Value = () => {
        return this[getNumberFromArray](this.param2);
    }

    getOperator = () => {
        return this.operator;
    }

    getStates = () => {
        console.log(JSON.stringify(this));
        return [this.getParam1Value(), this.getParam2Value(), this.getOperator()];
    }

    reset = () => {
        this.param1 = [0];
        this.param2 = [];
        this.operator = null
    }

    negative = () => {
        if (this.operator) {
            if (this.param2[0] !== '-') {
                this.param2 = this.param2.slice(1);
            } else {
                this.param2 = ['-', ...this.param2];
            }
            return this.getParam2Value();
        } else {
            if (this.param1[0] === '-') {
                this.param1 = this.param1.slice(1);
            } else {
                this.param1 = ['-', ...this.param1];
            }
            return this.getParam1Value();
        }
    }

    percentage = () => {
        let percent = null;
        if (this.operator) {
            percent = this[getNumberFromArray](this.param2) / 100;
            this.param2 = this[getArrayFromNumber](percent);
            return percent;
        } else {
            percent = this[getNumberFromArray](this.param1) / 100;
            this.param1 = this[getArrayFromNumber](percent)
        }
        return percent;
    }

    calculate = () => {

        if (this.param2.length === 0) return this[getNumberFromArray](this.param1);

        const [v1, v2] = [this[getNumberFromArray](this.param1), this[getNumberFromArray](this.param2)];
        let calResult = 0;
        switch (this.operator) {
            case '/': // divide
                calResult = v1 / v2;
                break;
            case '*': // multiply
                calResult = v1 * v2;
                break;
            case '+': // plus
                calResult = v1 + v2;
                break;
            case '-': // subtract
                calResult = v1 - v2;
                break;
            default:
                console.warn('Operator is null!');
                return this[getNumberFromArray](this.param1);
        }

        [this.param1, this.param2, this.operator] = [this[getArrayFromNumber](calResult), [], null];

        return calResult;
    }
}