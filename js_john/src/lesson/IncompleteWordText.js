import React from 'react';
import UnknownLetterInput from './unknown-letter';
import Letter from './checkpoint-letter';
import {IncompleteWordDiv} from './styles/checkpoint-styles';
import Confetti from 'react-dom-confetti';
import ReactHowler from 'react-howler';

class IncompleteWordText extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            numOfMissingLetters: 0,
            numOfCorrectInputs: 0,
            correctlyAnswered: false
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
            this.setState({correctlyAnswered: true});
            this.props.onCorrectlyAnswered();
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
        const config = {
            angle: 77,
            spread: 77,
            decay: 0.9,
            startVelocity: 47,
            elementCount: 110
        }
        return (
            <IncompleteWordDiv>
                <Confetti active={this.state.correctlyAnswered} config={config}/>
                <ReactHowler
                    src={[
                        "audio/correct-answer-bell-and-applause.mp3",
                        "audio/correct-answer-bell-and-applause.wav"
                    ]}
                    playing={this.state.correctlyAnswered}
                />
                {this.renderChildren()}
            </IncompleteWordDiv>
        );
    }
}

export default IncompleteWordText;
