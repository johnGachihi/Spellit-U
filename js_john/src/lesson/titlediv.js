import ReactHowler from 'react-howler';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import {faVolumeMute} from '@fortawesome/free-solid-svg-icons';

const TitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

class LessonAreaTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundMusicPlaying: true
        };

        this.togglePlayBackgroundMusic = this.togglePlayBackgroundMusic.bind(this)
    }

    togglePlayBackgroundMusic(e) {
        e.preventDefault();
        console.log("Mute button clicked");

        this.setState({
            backgroundMusicPlaying: !this.state.backgroundMusicPlaying
        })
    }

    render() {
        return (
            <div>
                <TitleDiv>
                    <h2 className="entry-title"> Lesson</h2>
                    <a src="#" onClick={this.togglePlayBackgroundMusic}>
                        <FontAwesomeIcon 
                            icon={this.state.backgroundMusicPlaying ? faVolumeUp : faVolumeMute} 
                            size="3x"
                        />
                    </a>
                </TitleDiv>
                <ReactHowler
                    src="audio/theme-sunny.mp3"
                    loop={true}
                    preload={true}
                    volume={0.05}
                    playing={this.state.backgroundMusicPlaying}
                />
            </div>
        )
    }
}

export default LessonAreaTitle;