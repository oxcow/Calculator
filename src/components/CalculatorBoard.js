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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.calculator.getStates();
        return true;
    }

    resetHandler = () => {
        this.calculator.reset();
        this.setState({calResult: 0});
    }

    inputNumberHandler = (e) => {
        this.calculator.inputNumber(e.currentTarget.innerHTML);
        this.setState({calResult: this.calculator.getDisplay()});
    }

    inputOperatorHandler = (e) => {
        this.calculator.inputOperator(e.currentTarget.innerHTML);
        this.setState({calResult: this.calculator.getDisplay()});
    }

    inputNegativeHandler = () => {
        this.calculator.negative();
        this.setState({calResult: this.calculator.getDisplay()});
    }

    inputPercentage = () => {
        this.calculator.percentage();
        this.setState({calResult: this.calculator.getDisplay()});
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
                            <span><button onClick={this.resetHandler}>A/C</button></span>
                            <span><button onClick={this.inputNegativeHandler}>+/-</button></span>
                            <span><button onClick={this.inputPercentage}>%</button></span>
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