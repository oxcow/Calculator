import React, {Component} from 'react';

import '../asserts/css/Calculator.css';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: 0,
            stack: []
        }
    }

    inputHandler = (e) => {
        this.state.stack.push(e.currentTarget.innerHTML);
        let displayValue = '';

        for (let input of this.state.stack) {
            displayValue += input;
        }

        this.setState({displayValue: displayValue})
    }

    cleanHandler = () => {
        this.setState({
            displayValue: '',
            stack: []
        });
    }

    calculateHandler = () => {

    }

    render() {
        return (
            <div className='calculator'>
                <div className='displayBar'>
                    {this.state.displayValue}
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
                                [7, 8, 9, 4, 5, 6, 1, 2, 3, 0,'.'].map(number => {
                                    return (<span key={number}>
                                        <button className={number === 0 ? 'zeroButton' : ''}
                                                onClick={this.inputHandler}>
                                            {number}
                                        </button>
                                    </span>)
                                })
                            }
                        </div>
                    </div>
                    <div className='operateBar'>
                        <span><button>/</button></span>
                        <span><button>*</button></span>
                        <span><button>+</button></span>
                        <span><button>-</button></span>
                        <span><button>=</button></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator