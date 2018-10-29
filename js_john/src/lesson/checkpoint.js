import React from 'react';
import styled from 'styled-components';
import {LessonAreaDiv} from './styles/checkpoint-styles';
import {CheckpointImage, CheckpointTitle} from './styles/checkpoint-styles';

class Checkpoint extends React.Component {

    render() {
        return (
            <LessonAreaDiv>
                <CheckpointTitle>Fill word</CheckpointTitle>
                <CheckpointImage src={"http://localhost/spellit-media/content/" + this.props.imageFileName}/>
                <div>{this.props.incompleteWord}</div>
            </LessonAreaDiv>
        )
    }

}

const CheckpointDiv = styled.div`
    display: flex;
    justify-content: center;
`;

export default Checkpoint;