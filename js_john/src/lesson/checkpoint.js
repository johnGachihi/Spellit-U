import React from 'react';
import styled from 'styled-components';
import {LessonAreaDiv} from './styles/checkpoint-styles';
import {CheckpointImage, CheckpointTitle} from './styles/checkpoint-styles';
import IncompleteWordText from './IncompleteWordText';
import {NextLevelButton} from './styles/checkpoint-styles';
import {getLevelIdFromURL} from './level';
import posed from 'react-pose';

class Checkpoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {correctlyAnswered: false}

        this.handleAnsweredCorrectly = this.handleAnsweredCorrectly.bind(this);
        this.goToNextLevel = this.goToNextLevel.bind(this);
    }

    handleAnsweredCorrectly() {
        console.log("onCorrectlyAnswered");
        this.setState({correctlyAnswered: true});
    }

    goToNextLevel(e) {
        e.preventDefault();

        const curLevelId = getLevelIdFromURL();
        fetch('http://localhost/spell-it2/php/controllers/levelscontroller.php?getNextLevel&curLevel='+curLevelId)
            .then(response => response.json())
            .then(nextLevelId => {
                console.log(nextLevelId);
                if(nextLevelId['present']){
                    window.location = 'http://localhost/spell-it2/lessontime.html?levelid='+nextLevelId['nextID'];
                } else {
                    alert("This is the last lesson");
                }
            });

    }

    render() {
        return (
            <LessonAreaDiv>
                <CheckpointTitle>Fill word</CheckpointTitle>
                <CheckpointImage src={"http://localhost/spellit-media/content/" + this.props.imageFileName}/>
                <IncompleteWordText
                    completeWord={this.props.completeWord}
                    incompleteWord={this.props.incompleteWord}
                    onCorrectlyAnswered={this.handleAnsweredCorrectly}
                />
                <NextLevelButton onClick={this.goToNextLevel} href="#" pose={this.state.correctlyAnswered ? "revealed" : "concealed"}>
                    Next Lesson
                </NextLevelButton>
            </LessonAreaDiv>
        )
    }

}



// const CheckpointDiv = styled.div`
//     display: flex;
//     justify-content: center;
// `;

export default Checkpoint;