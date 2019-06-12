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
        // console.log("did mount");
        this.calculator = new Calculator();
    }

    inputNumberHandler = (e) => {
        // TODO: Decimal point
        const inputValue = Number(e.currentTarget.innerHTML);
        const [param1, param2, operator] = this.calculator.getStates();
        let displayValue = 0;
        if (operator) {
            displayValue = param2 * 10 + inputValue;
            this.calculator.setParam2(displayValue);
        } else {
            displayValue = param1 * 10 + inputValue;
            this.calculator.setParam1(displayValue);
        }
        this.setState({calResult: displayValue});
    }

    inputOperatorHandler = (e) => {
        this.calculator.setOperator(e.currentTarget.innerHTML);
        this.calculateHandler()
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
                                    return (<span key={number}>
                                        <button className={number === 0 ? 'zeroButton' : ''}
                                                onClick={this.inputNumberHandler}>
                                            {number}
                                        </button>
                                    </span>)
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

export default CalculatorBoard