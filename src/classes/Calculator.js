import Arithmetic from './Arithmetic';

export default class Calculator {

    constructor() {
        this.expressionStatic = [];
        this.inputValue = [];
    }

    inputNumber = (val) => {
        this.inputValue.push(val);
    }

    getDisplay = () => {
        return [...this.expressionStatic, ...this.inputValue].join('');

    }

    inputOperator = (val) => {
        this.expressionStatic.push(this.inputValue.join(''));
        this.expressionStatic.push(val);
        this.inputValue = [];
    }

    getStates = () => {
        console.log(JSON.stringify(this));
    }

    reset = () => {
        this.expressionStatic = [];
        this.inputValue = [];
    }

    negative = () => {
        if (this.inputValue[0] !== '-') {
            this.inputValue = ['-', this.inputValue];
        } else {
            this.inputValue = this.inputValue.slice(1)
        }
    }

    percentage = () => {
        this.inputValue = [this.inputValue.join('') / 100];
    }

    calculate = () => {
        const arithmetic = new Arithmetic([...this.expressionStatic, this.inputValue.join('')]);
        const result = arithmetic.calculate();
        this.expressionStatic = [];
        this.inputValue = [result];
        return result;
    }
}