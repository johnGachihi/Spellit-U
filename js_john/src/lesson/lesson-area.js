import React from 'react';
import styled from 'styled-components';
import SplitText from 'react-pose-text';
import ReactHowler from 'react-howler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';

//Should be renamed
const LessonAreaDiv = styled.div`
    width: 90%;
    height: 500px;
    margin: auto;
    background-color: white;
    border-radius: 25px;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const TextDiv = styled.div`
    font-size: 10em;
    text-align: center
`;

const textAnim = {
    conceal: {
        scale: 0
    },
    reveal: {
        dragable: true,
        scale: 1,
        transition: {
            duration: 500,
            type: "spring"
        }
    }
}

const ReplayButton = styled.a`
    text-align: center;
    margin: 20px;
`;

class LessonArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneticLoaded: false,
            poseComplete: false,
            audioComplete: false
        };

        this.handlePhoneticLoaded = this.handlePhoneticLoaded.bind(this);
        this.handleAudioComplete = this.handleAudioComplete.bind(this);
        this.handlePoseComplete = this.handlePoseComplete.bind(this);

        this.howler = React.createRef();
    }

    handlePhoneticLoaded() {
        this.setState({phoneticLoaded: true});
    }

    handlePoseComplete() {
        if(this.state.audioComplete){
            this.props.handleComplete();
            console.log("Everything completed");
        } else {
            this.state.poseComplete = true;
            console.log("Pose completed");
        }
    }
    
    handleAudioComplete() {
        if(this.state.poseComplete){
            this.props.handleComplete();
            console.log("Everything completed");
        } else {
            this.state.audioComplete = true;
            console.log("Pose completed");
        }
    }

    render() {
        return (
            <LessonAreaDiv>
                <ReplayButton><FontAwesomeIcon icon={faRedoAlt} size="1x"/></ReplayButton>
                <TextDiv>
                    <ReactHowler
                        src={"http://localhost/spellit-media/content/" + this.props.phonetics}
                        onLoad={this.handlePhoneticLoaded}
                        volume={1}
                        ref={this.howler}
                        onEnd={this.handleAudioComplete}
                        playing={!this.props.stopped}
                    />
                    <SplitText
                        initialPose="conceal"
                        pose={this.state.phoneticLoaded ? "reveal" : "conceal"}
                        charPoses={textAnim}
                        onPoseComplete={this.handlePoseComplete}
                    >
                        {this.props.text}
                    </SplitText>
                </TextDiv>
            </LessonAreaDiv>
        )
    }
}

export default LessonArea;