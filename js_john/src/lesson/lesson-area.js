import React from 'react';
import styled from 'styled-components';
import SplitText from 'react-pose-text';
import ReactHowler from 'react-howler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
import posed from 'react-pose';

//Should be renamed
export const LessonAreaDiv = styled.div`
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

const Replay = posed.a({
    hoverable: true,
    draggable: true,
    pressable: true,
    init: {
        scale: 1
    },
    hover: {
        scale: 2,
        transition: {type: "spring"}
    },
    press: {
        scale: 1.5
    }
})

const ReplayButton = styled(Replay)`
    text-align: center;
    margin: 20px;
`;

const Next = posed.a({
    pressable: true,
    init: {scale: 1},
    press: {
        scale: 1.5,
        transition: {type: "spring"}
    }
})

const NextButton = styled(Next)`
    text-align: center;
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
        this.handleNextClick = this.handleNextClick.bind(this)

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

    handleNextClick() {
        this.props.onNextClicked();
    }

    render() {
        return (
            <LessonAreaDiv>
                <ReplayButton onClick={this.props.onRedo}>
                    <FontAwesomeIcon icon={faRedoAlt} size="1x"/>
                </ReplayButton>
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
                {this.props.stopped &&
                    <NextButton onClick={this.handleNextClick}>
                        <FontAwesomeIcon icon={faArrowCircleRight} size="3x"></FontAwesomeIcon>
                    </NextButton>
                }
            </LessonAreaDiv>
        )
    }
}

export default LessonArea;