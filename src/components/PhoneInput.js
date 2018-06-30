import React, { Component } from 'react';

class PhoneInput extends Component {
    constructor(props) {
        super(props);
        this.state = { inputVal: '', inputNumberFormat: '' };
    }

    componentWillMount() {
        console.log("componentWillMount");

    }
    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        
        window.removeEventListener('keydown', this.handleInput);

    }
    handleInput = (e) => {
        console.log(e.target.value.length);
        let value = e.target.value.replace(/[^\d]/g, '');
        let maskedNumber = this.normalizePhone(value)
        this.setState({ inputVal: maskedNumber, inputNumberFormat: value ? '+1' + value : '' });
    };

    normalizePhone = (onlyNums) => {
        if (!onlyNums) {
            return ''
        }

        if (onlyNums.length > this.state.inputVal.length) {
            if (onlyNums.length === 3) {
                return onlyNums + ')-'
            }
            if (onlyNums.length === 6) {
                return '(' + onlyNums.slice(0, 3) + ')-' + onlyNums.slice(3) + '-'
            }

        }
        if (onlyNums.length <= 3) {
            return '(' + onlyNums
        }
        if (onlyNums.length <= 6) {

            return '(' + onlyNums.slice(0, 3) + ')-' + onlyNums.slice(3)
        }
        if (onlyNums.length <= 10) {
            return '(' + onlyNums.slice(0, 3) + ')-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
        }
        return onlyNums
    }


    render() {
        return (<div>
            <input type="text" value={this.state.inputVal} onChange={this.handleInput} />
            <p>Value: {this.state.inputNumberFormat} </p>
        </div>);
    }
}

export default PhoneInput;