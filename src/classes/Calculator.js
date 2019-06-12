export default class Calculator {
    constructor() {
        this.param1 = 0;
        this.param2 = null;
        this.operator = null;
        this.calResult = 0;
    }

    setParam1 = (val) => {
        this.param1 = val;
    }

    setParam2 = (val) => {
        this.param2 = val;
    }

    setOperator = (operator) => {
        if (this.operator != null) {
            this.param1 = this.calculate();
        }
        this.operator = operator;
    }

    getStates = () => {
        return [this.param1, this.param2, this.operator];
    }

    add = () => {
        this.calResult = this.param1 + this.param2;
        // [this.param1, this.param2] = [this.calResult, null];
    }

    sub = () => {
        this.calResult = this.param1 - this.param2;
        // [this.param1, this.param2] = [this.calResult, null];
    }

    multi = () => {
        this.calResult = this.param1 * this.param2;
        // [this.param1, this.param2] = [this.calResult, null];
    }

    div = () => {
        this.calResult = this.param1 / this.param2;
        // [this.param1, this.param2] = [this.calResult, null];
    }

    calculate = () => {
        // TODO: 单目运算
        // 二目运算
        if (this.param2 === null) return this.param1;

        switch (this.operator) {
            case '/':
                this.div();
                break;
            case '*':
                this.multi();
                break;
            case '+':
                this.add();
                break;
            case '-':
                this.sub();
                break;
            default:
                console.warn('Operator is null!');
                return this.param1;
        }
        [this.param1, this.param2] = [this.calResult, null];
        return this.calResult;
    }
}