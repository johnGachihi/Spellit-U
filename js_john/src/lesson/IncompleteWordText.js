import React from 'react';
import UnknownLetterInput from './unknown-letter';
import Letter from './checkpoint-letter';
import {IncompleteWordDiv} from './styles/checkpoint-styles';

class IncompleteWordText extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            numOfMissingLetters: 0,
            numOfCorrectInputs: 0
        }

        this.renderChildren = this.renderChildren.bind(this);
        this.handleCorrectInput = this.handleCorrectInput.bind(this);
    }

    handleCorrectInput() {
        this.state.numOfCorrectInputs += 1;
        const {numOfCorrectInputs, numOfMissingLetters} = this.state;
        if(numOfCorrectInputs === numOfMissingLetters) {
            //celebrate
            console.log("celebrate");
        }
        else {
            console.log("numOfMissingLetters", numOfMissingLetters);
            console.log("numOfCorrectInputs", numOfCorrectInputs);
        }
    }
    
    //Two types of children: `label` for given parts of word
    //`Custom input` for unknown parts
    renderChildren() {
        const incompleteWord = this.props.incompleteWord;
        const completeWord = this.props.completeWord;

        let numOfMissingLetters = 0;
        const children = [];
        for(let [index, letter] of incompleteWord.split('').entries()){
            console.log(letter);
            if(letter == "_"){
                children.push(
                    <UnknownLetterInput
                        key={index}
                        correctInput={completeWord.charAt(index)}
                        onCorrectInputInserted={this.handleCorrectInput}
                    />
                );
                numOfMissingLetters++;
            }
            else {
                children.push(
                    <Letter key={index} letter={letter}></Letter>
                );
            }
        }
        this.state.numOfMissingLetters = numOfMissingLetters;
        return children;
    }

    render() {
        return (
            <IncompleteWordDiv>
                {this.renderChildren()}
            </IncompleteWordDiv>
        );
    }
}

export default IncompleteWordText;
