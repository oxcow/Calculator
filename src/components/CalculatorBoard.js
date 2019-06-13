import React, {Component} from 'react';
import Calculator from '../classes/Calculator';

import '../asserts/css/Calculator.css';

class CalculatorBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calResult: 0
        }
    }

    componentDidMount() {
        this.calculator = new Calculator();
    }

    inputNumberHandler = (e) => {
        const inputValue = e.currentTarget.innerHTML;
        const operator = this.calculator.getOperator();
        let displayValue = 0;
        if (operator) {
            this.calculator.setParam2(inputValue);
            displayValue = this.calculator.getParam2Value();
        } else {
            this.calculator.setParam1(inputValue);
            displayValue = this.calculator.getParam1Value();
        }
        if (inputValue === '.') {
            displayValue += '.';
        }
        this.setState({calResult: displayValue});
    }

    inputOperatorHandler = (e) => {
        this.calculator.setOperator(e.currentTarget.innerHTML);
        this.calculateHandler();
    }

    calculateHandler = () => {
        this.setState({
            calResult: this.calculator.calculate()
        })
    }

    render() {
        return (
            <div className='calculator'>
                <div className='displayBar'>
                    {this.state.calResult}
                </div>
                <div className='clickBar'>
                    <div className='basicCalculator'>
                        <div className='basicBar'>
                            <span><button>A/C</button></span>
                            <span><button>+/-</button></span>
                            <span><button>%</button></span>
                        </div>
                        <div className='numberBar'>
                            {
                                [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map(number => {
                                    return (
                                        <span key={number}>
                                            <button className={number === 0 ? 'zeroButton' : ''}
                                                    onClick={this.inputNumberHandler}>
                                                {number}
                                            </button>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='operateBar'>
                        {
                            ['/', '*', '+', '-'].map((operator, i) => {
                                return (
                                    <span key={i}>
                                        <button onClick={this.inputOperatorHandler}>{operator}</button>
                                    </span>
                                )
                            })
                        }
                        <span><button onClick={this.calculateHandler}>=</button></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalculatorBoard;