import React from 'react';
import styled from 'styled-components';
import SplitText from 'react-pose-text';
import ReactHowler from 'react-howler';

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

class TextAndPhonetics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneticLoaded: false
        };

        this.handlePhoneticLoaded = this.handlePhoneticLoaded.bind(this);
    }

    handlePhoneticLoaded() {
        this.setState({phoneticLoaded: true});
    }

    render() {
        return (
            <LessonAreaDiv>
                <ReplayButton>Replay</ReplayButton>
                <TextDiv>
                    <ReactHowler
                        src="http://localhost/spellit-content/SIT969202800029396699.mp3"
                        onLoad={this.handlePhoneticLoaded}
                        volume={1}
                    />
                    <SplitText initialPose="conceal" pose={this.state.phoneticLoaded ? "reveal" : "conceal"} charPoses={textAnim}>Allow</SplitText>
                </TextDiv>
            </LessonAreaDiv>
        )
    }
}

export default TextAndPhonetics;