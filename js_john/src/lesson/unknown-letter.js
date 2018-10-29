import React from 'react';
import styled from 'styled-components';
import {UnknownLetterTextInput} from './styles/checkpoint-styles'

const TextInput = styled.input`
    width: 50px;
`;

class UnknownLetterInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const input = e.target.value;

        if(input) {
            if (input !== this.props.correctInput) {
                console.log("Provided input NOT correct");
                this.setState({correct: false, input});
            }
            else {
                console.log("Provided input correct");
                this.setState({correct: true, input});
                this.props.onCorrectInputInserted();
            }
        }
        else {
            this.setState({input})
        }
    }

    render() {
        const {correct, input} = this.state;
        const inputPresent = input ? true : false;
        const _UnknownLetterTextInput = styled(UnknownLetterTextInput)`
            border-color: ${inputPresent ? (correct ? '#5eff63' : '#ff3d3d') : 'black'}
        `;
        return (
            <_UnknownLetterTextInput type="text" value={this.state.input} onChange={this.handleInputChange}/>
        );
    }
}

export default UnknownLetterInput;